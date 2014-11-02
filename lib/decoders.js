var varint = require('varint');

exports.string = function(buff){
  return buff.toString('utf8');
};

exports.uint8 = function(buff){
  return buff.readUInt8(0);
};

exports.uint16le = function(buff){
  return buff.readUInt16LE(0);
};

exports.uint16be = function(buff){
  return buff.readUInt16BE(0);
};

exports.uint32le = function(buff){
  return buff.readUInt32LE(0);
};

exports.uint32be = function(buff){
  return buff.readUInt32BE(0);
};

exports.int8 = function(buff){
  return buff.readInt8(0);
};

exports.int16le = function(buff){
  return buff.readInt16LE(0);
};

exports.int16be = function(buff){
  return buff.readInt16BE(0);
};

exports.int32le = function(buff){
  return buff.readInt32LE(0);
};

exports.int32be = function(buff){
  return buff.readInt32BE(0);
};

exports.floatle = function(buff){
  return buff.readFloatLE(0);
};

exports.floatbe = function(buff){
  return buff.readFloatBE(0);
};

exports.doublele = function(buff){
  return buff.readDoubleLE(0);
};

exports.doublebe = function(buff){
  return buff.readDoubleBE(0);
};


exports.varint = function(buff){
  return varint.decode(buff);
};
