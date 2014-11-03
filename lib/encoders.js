var varint = require('varint');

/**
 * Here are all internal encoders supported by Bolty. They all
 * receive those parameters `value` as the value found on the encoded object,
 * `field`  as the field configuration inside the schema and `schema` as the
 * current Bolty instance being used. All encoders must return a buffer.
 *
 * @module
 */

/**
 * Encodes an UTF8 string into a buffer. Specify `string` as the field type
 * to use this.
 *
 * @param  {string} value The string to be encoded
 * @return {buffer}       The string encoded as a buffer
 */
exports.string = function(value) {
  return new Buffer(String(value), 'utf8');
};

/**
 * Encodes an unsigned 8 bits number inside a buffer with 1 byte. Specify
 * `uint8` as the field type to use this.
 *
 * @param  {number} value  The number to be encoded
 * @return {buffer}        The number encoded as a 1 byte buffer
 */
exports.uint8 = function(value) {
  var buff = new Buffer(1);
  buff.writeUInt8(Number(value), 0);

  return buff;
};

/**
 * Encodes an unsigned 16 bits value inside a buffer with 2 bytes and ordered as
 * little-endian. Specify `uint16le` as the field type to use this.
 *
 * @param  {number} value The 16 bits number.
 * @return {buffer}      The number encoded as a 2 bytes buffer
 */
exports.uint16le = function(value) {
  var buff = new Buffer(2);
  buff.writeUInt16LE(Number(value), 0);

  return buff;
};


/**
 * Encodes an unsigned 16 bits value inside a buffer with 2 bytes and ordered as
 * big-endian. Specify `uint16be` as the field type to use this.
 *
 * @param  {number} value The 16 bits number.
 * @return {buffer}      The number encoded as a 2 bytes buffer
 */
exports.uint16be = function(value) {
  var buff = new Buffer(2);
  buff.writeUInt16BE(Number(value), 0);

  return buff;
};

/**
 * Encodes an unsigned 32 bits value inside a buffer with 4 bytes and ordered as
 * little-endian. Specify `uint32le` as the field type to use this.
 *
 * @param  {number} value The 32 bits number.
 * @return {buffer}      The number encoded as a 4 bytes buffer
 */
exports.uint32le = function(value) {
  var buff = new Buffer(4);
  buff.writeUInt32LE(Number(value), 0);

  return buff;
};

/**
 * Encodes an unsigned 32 bits value inside a buffer with 4 bytes and ordered as
 * big-endian. Specify `uint32be` as the field type to use this.
 *
 * @param  {number} value The 32 bits number.
 * @return {buffer}      The number encoded as a 4 bytes buffer
 */
exports.uint32be = function(value) {
  var buff = new Buffer(4);
  buff.writeUInt32BE(Number(value), 0);

  return buff;
};

/**
 * Encodes a signed 8 bits number inside a buffer with 1 byte. Specify
 * `uint8` as the field type to use this.
 *
 * @param  {number} value  The number to be encoded
 * @return {buffer}        The number encoded as a 1 byte buffer
 */
exports.int8 = function(value) {
  var buff = new Buffer(1);
  buff.writeInt8(Number(value), 0);

  return buff;
};

/**
 * Encodes a signed 16 bits value inside a buffer with 2 bytes and ordered as
 * little-endian. Specify `uint16le` as the field type to use this.
 *
 * @param  {number} value The 16 bits number.
 * @return {buffer}      The number encoded as a 2 bytes buffer
 */
exports.int16le = function(value) {
  var buff = new Buffer(2);
  buff.writeInt16LE(Number(value), 0);

  return buff;
};

/**
 * Encodes a signed 16 bits value inside a buffer with 2 bytes and ordered as
 * big-endian. Specify `uint16be` as the field type to use this.
 *
 * @param  {number} value The 16 bits number.
 * @return {buffer}      The number encoded as a 2 bytes buffer
 */
exports.int16be = function(value) {
  var buff = new Buffer(2);
  buff.writeInt16BE(Number(value), 0);

  return buff;
};

/**
 * Encodes a signed 32 bits value inside a buffer with 4 bytes and ordered as
 * little-endian. Specify `uint32le` as the field type to use this.
 *
 * @param  {number} value The 32 bits number.
 * @return {buffer}      The number encoded as a 4 bytes buffer
 */
exports.int32le = function(value) {
  var buff = new Buffer(4);
  buff.writeInt32LE(Number(value), 0);

  return buff;
};

/**
 * Encodes a signed 32 bits value inside a buffer with 4 bytes and ordered as
 * big-endian. Specify `uint32be` as the field type to use this.
 *
 * @param  {number} value The 32 bits number.
 * @return {buffer}      The number encoded as a 4 bytes buffer
 */
exports.int32be = function(value) {
  var buff = new Buffer(4);
  buff.writeInt32BE(Number(value), 0);

  return buff;
};

/**
 * Encodes a 32 bits float number inside a buffer with 4 bytes and ordered as
 * little-endian. Specify `floatle` as the field type to use this.
 *
 * @param  {number} value The 32 bits float.
 * @return {buffer}      The number encoded as a 4 bytes buffer
 */
exports.floatle = function(value) {
  var buff = new Buffer(4);
  buff.writeFloatLE(Number(value), 0);

  return buff;
};

/**
 * Encodes a 32 bits float number inside a buffer with 4 bytes and ordered as
 * big-endian. Specify `floatbe` as the field type to use this.
 *
 * @param  {number} value The 32 bits float.
 * @return {buffer}      The float encoded as a 4 bytes buffer
 */
exports.floatbe = function(value) {
  var buff = new Buffer(4);
  buff.writeFloatBE(Number(value), 0);

  return buff;
};

/**
 * Encodes a 64 bits double number inside a buffer with 8 bytes and ordered as
 * little-endian. Specify `doublele` as the field type to use this.
 *
 * @param  {number} value The 64 bits double.
 * @return {buffer}      The double encoded as a 8 bytes buffer
 */
exports.doublele = function(value) {
  var buff = new Buffer(8);
  buff.writeDoubleLE(Number(value), 0);

  return buff;
};

/**
 * Encodes a 64 bits double number inside a buffer with 8 bytes and ordered as
 * big-endian. Specify `doublebe` as the field type to use this.
 *
 * @param  {number} value The 64 bits float.
 * @return {buffer}      The double encoded as a 8 bytes buffer
 */
exports.doublebe = function(value) {
  var buff = new Buffer(8);
  buff.writeDoubleBE(Number(value), 0);

  return buff;
};

/**
 * Encodes number as a base 128 encoded varint. Specify `varint` as the
 * field type to use this.
 *
 * @param  {number} value The number.
 * @return {buffer}      A buffer representing the base 128 varint
 */
exports.varint = function(number) {
  return new Buffer(varint.encode(Number(number)));
};

/**
 * Simply pass along a buffer to the final serialized buffer, this way you
 * can have buffers inside your objects. Specify `buffer` as the field type
 * to use this.
 *
 * @param  {buffer} buffer The buffer
 * @return {buffer}        A copy of the buffer
 */
exports.buffer = function(buffer) {
  return new Buffer(buffer);
};

/**
 * Convert a `Date` object to number and to a varint.
 *
 * @param  {date}   date The date to be encoded
 * @return {buffer}      A buffer from the date
 */
exports.date = function(date) {
  return new Buffer(varint.encode(new Date(date).getTime()));
};

/**
 * Convert a `Boolean` to a buffer.
 *
 * @param  {date}  date The date to be encoded
 * @return {buffer}     A buffer from the date
 */
exports.boolean = function(value) {
  return new Buffer(Boolean(value) ? '1' : '0');
};

/**
 * Support for subschemas inside your object, this way we can have complex
 * object serialization.
 *
 * @param  {object} obj   The object to be serialized
 * @param  {object} field The field with a schema key, so we know what subschema
 *                        we need to use.
 * @param  {object} prev  The current instance of Bolty
 * @return {buffer}       A serialized Bolty buffer
 */
exports.schema = function(obj, field, prev) {
  var Bolty = require('../'); // Circular dependencies sucks..
  var template = new Bolty(prev._schemas[field.schema]);
  template._encoders = prev._encoders;
  template._decoders = prev._decoders;
  template._schemas = prev._schemas;

  return template.encode(obj);
};
