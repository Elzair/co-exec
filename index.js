
/**
 * Module dependencies.
 */

var exec = require('child_process').exec;

/**
 * Execute `cmd`.
 */

var thunkifyExec = function(cmd, opts){
  return function(done){
    exec(cmd, opts, function(err, stdout, stderr){
      done(err, stdout);
    });
  }
};

module.exports = function* (cmd, opts) {
  var ret = {out: null, err: null};
  try {
    ret.out = yield thunkifyExec(cmd, opts);
  }
  catch (err) {
    ret.err = err;
  }
  finally {
    return ret;
  }
}
