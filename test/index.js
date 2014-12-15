
var co = require('co');
var co_mocha = require('co-mocha');
var exec = require('..');
var should = require('chai').should();

describe('exec(cmd)', function(){
  it('should return stdout', function*(){
    var ret = yield exec('echo hello');
    ret.should.have.property('stdout', 'hello\n');
    ret.should.have.property('stderr', '');
    ret.should.have.property('err', null);
  })

  it('should return err on error', function*() {
    var ret = yield exec('cat IDontExist');
    ret.should.be.an('object');
    ret.should.have.property('stdout', null)
    ret.should.have.property('stderr', null)
    ret.should.have.property('err');
    ret.err.should.be.an('object');
    ret.should.have.deep.property('err.message');
    ret.err.message.should.include('IDontExist');
  })
})

describe('exec(cmd, opts)', function(){
  it('should set options', function*(){
    var ret = yield exec('echo hello', { encoding: 'base64' });
    new Buffer(ret.stdout, 'base64').toString().should.equal('hello\n');
  })
})
