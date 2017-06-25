const AWS = require('aws-sdk');
const debug = require('debug')('prismic-lambda:webhook');


function handle(event, context, cb) {
  debug('Running webhook handler');

  return getBody(event)
  .then(body => {
    return runWebhook(body);
  })
  .then(output => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({ message: 'ok' })
    };
    cb(null, response);
  })
  .catch(err => {
    console.warn('Handling event failed:', err);
    cb(null, {
      statusCode: 400,
      body: 'Failure in request or in handler'
    });
  });
}

function getBody(event) {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(event.body));
    }
    catch (err) {
      reject(err);
    }
  });
}

function sendNotification(msg) {
  const sns = new AWS.SNS();
  const params = {
    Message: JSON.stringify(msg),
    TopicArn: null,
  };

  // NOTE: Use createTopic to retrieve ARN from exsting SNS
  return sns
  .createTopic({ Name: 'PRISMIC_LAMBDA_WEBHOOK' })
  .promise()
  .then(resp => {
    debug('Sending SNS message to', resp.TopicArn);
    params.TopicArn = resp.TopicArn;
    return sns.publish(params).promise();
  });
}

function runWebhook(data) {
  const incomingSecret = data.secret;
  const serviceSecret = process.env.PRISMIC_WEBHOOK_SECRET;

  if (!incomingSecret || !serviceSecret || incomingSecret !== serviceSecret) {
    return Promise.reject(new Error('Permission denied'));
  }
  return sendNotification(data);
}

module.exports = {
  handle,
  runWebhook,
};
