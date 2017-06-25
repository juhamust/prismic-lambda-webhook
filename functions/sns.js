const debug = require('debug')('prismic-lambda:sns');

function handle(event, context, cb) {
  debug('Received an event', event);

  return runSNS()
  .then(res => {
    cb(null, { message: 'ok' });
  })
  .catch(err => {
    cb(err);
  });
}

function runSNS() {
  // TODO: Implement me
  return Promise.resolve('done');
}

module.exports = {
  handle,
};
