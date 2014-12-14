
var co = require('co');
var co_mocha = require('co-mocha');
var exec = require('..');
var should = require('chai').should();

describe('exec(cmd)', function(){
  it('should return stdout', function*(){
    var ret = yield exec('echo hello');
    ret.out.should.equal('hello\n');
  })

  it('should return stderr', function*() {
    var ret = yield exec('cat IDontExist');
    ret.should.be.an('object');
    ret.should.have.property('out', null)
    ret.should.have.property('err');
    ret.err.should.be.an('object');
    ret.err.message.should.include('IDontExist');
  })
})

describe('exec(cmd, opts)', function(){
  it('should set options', function*(){
    var ret = yield exec('echo hello', { encoding: 'base64' });
    new Buffer(ret.out, 'base64').toString().should.equal('hello\n');
  })
})
