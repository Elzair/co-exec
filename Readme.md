
# exec-co

  Node core `exec()` wrapped to return a thunk for [co](https://github.com/visionmedia/co) that returns output and error.

## Installation

```
$ npm install exec-co
```

## Example

  Do some stuff with git:

```js
var co = require('co');
var exec = require('exec-co');

co(function *(){
  var commit = yield exec('git rev-parse HEAD');
  var commits = yield exec('git rev-list master | wc -l');
  console.log('the latest commit is %s, with a total of %s', commit.out.slice(0, 5), commits.out.trim());

  var noncmd = yield exec('git nonexistent-cmd');
  console.error('Error: %s', noncmd.err.message);
});
```

## License

  MIT

