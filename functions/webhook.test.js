const AWS = require('aws-sdk-mock');
const webhook = require('./webhook');
const event = require('./event.json');

const exampleWebhook = {
  type: 'test-trigger',
  domain: 'my-repo',
  apiUrl: 'https://my-repo.prismic.io/api',
  secret: 'test',
};

beforeEach(() => {
  AWS.mock('SNS', 'publish', 'test');
  AWS.mock('SNS', 'createTopic', (params, cb) => {
    cb(null, { TopicArn: 'test' });
  });
  process.env.PRISMIC_WEBHOOK_SECRET = 'test';
});

afterEach(() => {
  AWS.restore();
  process.env.PRISMIC_WEBHOOK_SECRET = null;
});

test('handles the webhook', () => {
  return webhook.runWebhook(exampleWebhook);
});

test('rejects invalid secret', (done) => {
  process.env.PRISMIC_WEBHOOK_SECRET = 'hacker';
  return webhook.runWebhook(exampleWebhook)
  .then(done.fail)
  .catch(done);
});

test('sends SNS notification', (done) => {
  AWS.restore('SNS', 'publish');
  AWS.mock('SNS', 'publish', (msg) => {
    expect(msg).toHaveProperty('TopicArn');
    done();
  });

  webhook.runWebhook(exampleWebhook);
});
