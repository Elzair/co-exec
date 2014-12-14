
var co = require('co');
var co_mocha = require('co-mocha');
var exec = require('..');
var should = require('chai').should();

describe('exec(cmd)', function(){
  it('should return stdout', function*(){
    var ret = yield exec('echo hello');
    ret.should.equal('hello\n');
  })

  it('should throw on error', function*(){
    try {
      var ret = yield exec('does_not_exist');
    } catch (err) {
      err.message.should.include('does_not_exist');
    }
  })
})

describe('exec(cmd, opts)', function(){
  it('should set options', function*(){
    var ret = yield exec('echo hello', { encoding: 'base64' });
    new Buffer(ret, 'base64').toString().should.equal('hello\n');
  })
})
