require('chai').should();

module.exports = function(suite, object){
  var encoded = JSON.stringify(object);

  suite.add('JSON.stringify', function(){
    JSON.stringify(object);
  });

  suite.add('JSON.parse', function(){
    JSON.parse(encoded);
  });
};
