var varint = require('varint');

exports.string = function(value){
  return new Buffer(value, 'utf8');
};

exports.uint8 = function(value){
  var buff = new Buffer(1);
  buff.writeUInt8(value, 0);

  return buff;
};

exports.uint16le = function(value){
  var buff = new Buffer(2);
  buff.writeUInt16LE(value, 0);

  return buff;
};

exports.uint16be = function(value){
  var buff = new Buffer(2);
  buff.writeUInt16BE(value, 0);
};

exports.uint32le = function(value){
  var buff = new Buffer(4);
  buff.writeUInt32LE(value, 0);

  return buff;
};

exports.uint32be = function(value){
  var buff = new Buffer(4);
  buff.writeUInt32BE(value, 0);

  return buff;
};

exports.int8 = function(value){
  var buff = new Buffer(1);
  buff.writeInt8(value, 0);

  return buff;
};

exports.int16le = function(value){
  var buff = new Buffer(2);
  buff.writeInt16LE(value, 0);

  return buff;
};

exports.int16be = function(value){
  var buff = new Buffer(2);
  buff.writeInt16BE(value, 0);

  return buff;
};

exports.int32le = function(value){
  var buff = new Buffer(4);
  buff.writeInt32LE(value, 0);

  return buff;
};

exports.int32be = function(value){
  var buff = new Buffer(4);
  buff.writeInt32BE(value, 0);

  return buff;
};

exports.floatle = function(value){
  var buff = new Buffer(4);
  buff.writeFloatLE(value, 0);

  return buff;
};

exports.floatbe = function(value){
  var buff = new Buffer(4);
  buff.writeFloatBE(value, 0);

  return buff;
};

exports.doublele = function(value){
  var buff = new Buffer(8);
  buff.writeDoubleLE(value, 0);

  return buff;
};

exports.doublebe = function(value){
  var buff = new Buffer(8);
  buff.writeDoubleBE(value, 0);

  return buff;
};

exports.varint = function(number){
  return new Buffer(varint.encode(number));
};
