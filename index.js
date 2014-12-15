
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
      done(err, [stdout, stderr]);
    });
  }
};

module.exports = function* (cmd, opts) {
  var ret = {err: null, stdout: null, stderr: null};
  try {
    var res = yield thunkifyExec(cmd, opts);
    ret.stdout = res[0];
    ret.stderr = res[1];
  }
  catch (err) {
    ret.err = err;
  }
  finally {
    return ret;
  }
}
