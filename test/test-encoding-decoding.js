var encoders = require('../lib/encoders');
var decoders = require('../lib/decoders');
require('chai').should();

describe('Encoding and decoding testing', function() {

  it('should manage string', function() {
    decoders.string(encoders.string('hello'))
      .should.be.equal('hello');
  });

});
