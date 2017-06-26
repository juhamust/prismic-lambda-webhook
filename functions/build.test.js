const sinon = require('sinon');
const Prismic = require('prismic.io');
const build = require('./build');

let prismicStub = null;

beforeEach(() => {
  prismicStub = sinon.stub(Prismic, 'api');
  prismicStub.returns(Promise.resolve({
    query: sinon.stub().returns({
      results: ["foo"],
    }),
  }));
});

afterEach(() => {
  prismicStub.restore();
});

test('invokes callback', (done) => {
  build.handle({}, {}, (err, res) => {
    if (err) {
      done.fail(err);
    }
    done();
  });
});
