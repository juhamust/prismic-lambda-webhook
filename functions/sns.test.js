const sns = require('./sns');

test('invokes callback', (done) => {
  sns.handle({}, {}, (err, res) => {
    if (err) {
      done.fail(err);
    }
    done();
  });
});
