var varint = require('varint');

exports.string = function(buff){
  return buff.toString('utf8');
};

exports.uint32le = function(buff){
  return buff.readUInt32LE(0);
};

exports.varint = function(buff){
  return varint.decode(buff);
};
