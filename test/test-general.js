var Bolty = require('../');
require('chai').should();

describe('General structural', function() {

  it('should export a function', function() {
    (typeof Bolty).should.be.equal('function');
  });

  it('should have #encode, #decode, #plugin and #schema', function(){
    var bolty = new Bolty({
      name: 'testing',
      fields: {}
    });

    bolty.should.have.property('encode');
    bolty.should.have.property('decode');
    bolty.should.have.property('plugin');
    bolty.should.have.property('schema');
  });

  it('should add encoder and decoder when plugged in', function(){
    var bolty = new Bolty({
      name: 'testing',
      fields: {}
    });

    bolty.plugin({
      name: 'testing',
      encoder: function(){},
      decoder: function(){}
    });

    bolty._decoders.should.have.property('testing');
    bolty._encoders.should.have.property('testing');
  });

  it('should add aditional schema', function(){
    var bolty = new Bolty({
      name: 'testing',
      surname: 'testing'
    });

    bolty.schema('testing', {
      name: 'string',
      surname: 'string'
    });

    bolty._schemas.should.have.property('testing');
  });


});
