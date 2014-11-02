var varint = require('varint');

exports.string = function(value){
  return new Buffer(value, 'utf8');
};

exports.uint32le = function(value){
  var buff = new Buffer(4);
  buff.writeUInt32LE(value, 0);

  return buff;
};

exports.varint = function(number){
  return new Buffer(varint.encode(number));
};
