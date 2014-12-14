
var co = require('co');
var exec = require('./');

co(function *(){
  var commit = yield exec('git rev-parse HEAD');
  var commits = yield exec('git rev-list master | wc -l');
  console.log('the latest commit is %s, with a total of %s', commit.out.slice(0, 5), commits.out.trim());

  var noncmd = yield exec('git nonexistent-cmd');
  console.error('Error: %s', noncmd.err.message);
});
