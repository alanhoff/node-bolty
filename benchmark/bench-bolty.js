var Bolty = require('../');
require('chai').should();
var template = new Bolty({
  name: 'benchmark',
  fields: {
    name: {
      id: 1,
      type: 'string'
    },
    surname: {
      id: 2,
      type: 'string'
    },
    time: {
      id: 3,
      type: 'date'
    },
    awesome: {
      id: 4,
      type: 'boolean'
    }
  }
});

// Previous encoded object for decode benchmark

module.exports = function(suite, object){
  var encoded = template.encode(object);

  suite.add('Bolty.encode', function(){
    template.encode(object);
  });

  suite.add('Bolty.decode', function(){
    template.decode(encoded);
  });
};
