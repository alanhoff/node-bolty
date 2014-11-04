var encoders = require('../lib/encoders');
var decoders = require('../lib/decoders');
var Bolty = require('..');
require('chai').should();

describe('Encoding and decoding testing', function() {

  it('should manage string', function() {
    decoders.string(encoders.string('hello'))
      .should.be.equal('hello');
  });

  it('should manage uint8', function() {
    decoders.uint8(encoders.uint8(3))
      .should.be.equal(3);
  });

  it('should manage uint16le', function() {
    decoders.uint16le(encoders.uint16le(300))
      .should.be.equal(300);
  });

  it('should manage uint16be', function() {
    decoders.uint16be(encoders.uint16be(320))
      .should.be.equal(320);
  });

  it('should manage uint32le', function() {
    decoders.uint32le(encoders.uint32le(60000))
      .should.be.equal(60000);
  });

  it('should manage uint32be', function() {
    decoders.uint32be(encoders.uint32be(61000))
      .should.be.equal(61000);
  });

  it('should manage int8', function() {
    decoders.int8(encoders.int8(3))
      .should.be.equal(3);
  });

  it('should manage int16le', function() {
    decoders.int16le(encoders.int16le(300))
      .should.be.equal(300);
  });

  it('should manage int16be', function() {
    decoders.int16be(encoders.int16be(320))
      .should.be.equal(320);
  });

  it('should manage int32le', function() {
    decoders.int32le(encoders.int32le(60000))
      .should.be.equal(60000);
  });

  it('should manage int32be', function() {
    decoders.int32be(encoders.int32be(61000))
      .should.be.equal(61000);
  });

  it('should manage floatle', function() {
    decoders.floatle(encoders.floatle(0.2)).toFixed(1)
      .should.be.equal('0.2');
  });

  it('should manage floatbe', function() {
    decoders.floatbe(encoders.floatbe(0.5)).toFixed(1)
      .should.be.equal('0.5');
  });

  it('should manage doublele', function() {
    decoders.doublele(encoders.doublele(0.120))
      .should.be.equal(0.120);
  });

  it('should manage doublebe', function() {
    decoders.doublebe(encoders.doublebe(0.200))
      .should.be.equal(0.200);
  });

  it('should manage buffer', function(){
    decoders.buffer(encoders.buffer(new Buffer('Hello'))).toString()
      .should.be.equal('Hello');
  });

  it('should manage boolean', function(){
    decoders.boolean(encoders.boolean(false)).toString()
      .should.be.equal('false');
  });

  it('should manage date', function(){
    var date = new Date();

    decoders.date(encoders.date(date)).getTime()
      .should.be.equal(date.getTime());
  });

  it('should manage subschemas', function(){

    var template = new Bolty({
      name: 'parent',
      fields: {
        name: {
          id: 1,
          type: 'schema',
          schema: 'child'
        }
      }
    });

    template.schema('child', {
      first: {
        id: 1,
        type: 'string'
      },
      last: {
        id: 2,
        type: 'string'
      }
    });

    var person = template.decode(template.encode({
      name: {
        first: 'Alan',
        last: 'Hoffmeister'
      }
    }));

    person.name.first.should.be.equal('Alan');
    person.name.last.should.be.equal('Hoffmeister');

  });
});
