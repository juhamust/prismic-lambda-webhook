const debug = require('debug')('prismic-lambda:sns');
const Prismic = require('prismic.io');

const { PRISMIC_API_ENDPOINT, PRISMIC_API_TOKEN } = process.env;

function handle(event, context, cb) {
  debug('Received an event: %o', event);

  return runSNS()
  .then(res => {
    cb(null, { message: 'ok' });
  })
  .catch(err => {
    debug('Failed to execute:', err);
    cb(err);
  });
}

function runSNS() {
  return Prismic.api(PRISMIC_API_ENDPOINT, {
    accessToken: PRISMIC_API_TOKEN,
  })
  .then(api => {
    // TODO: Implement me
    return api.query('');
  })
  .then(res => {
    debug('Received %o', res);
    return Promise.resolve(res.results);
  });
}

module.exports = {
  handle,
};
