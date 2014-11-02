var varint = require('varint');
var Bolty = require('../');

/**
 * Here are all internal decoders supported by Bolty. They all
 * receive those parameters: `buff` as the buffer extracted from the serialized
 * buffer, `field` as the field configuration inside the schema and `schema`
 * as the current Bolty instance being used. All encoders must return the
 * decoded value.
 *
 * @module
 */

/**
 * Decodes a buffer into a UTF8 string. Specify `string` as the field type
 * to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {string}      The string decoded
 */
exports.string = function(buff) {
  return buff.toString('utf8');
};

/**
 * Decodes a buffer into an unsigned 8 bits number. Specify `uint8` as the
 * field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {string}      The unsigned 8 bits number
 */
exports.uint8 = function(buff) {
  return buff.readUInt8(0);
};

/**
 * Decodes a buffer ordered with little-endian into an unsigned 16 bits number.
 * Specify `uint16le` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The unsigned 16 bits number
 */
exports.uint16le = function(buff) {
  return buff.readUInt16LE(0);
};

/**
 * Decodes a buffer ordered with big-endian into an unsigned 16 bits number.
 * Specify `uint16be` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The unsigned 16 bits number
 */
exports.uint16be = function(buff) {
  return buff.readUInt16BE(0);
};

/**
 * Decodes a buffer ordered with little-endian into an unsigned 32 bits number.
 * Specify `uint32le` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The unsigned 32 bits number
 */
exports.uint32le = function(buff) {
  return buff.readUInt32LE(0);
};

/**
 * Decodes a buffer ordered with big-endian into an unsigned 32 bits number.
 * Specify `uint32be` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The unsigned 32 bits number
 */
exports.uint32be = function(buff) {
  return buff.readUInt32BE(0);
};

/**
 * Decodes a buffer into a signed 8 bits number. Specify `int8` as the
 * field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {string}      The signed 8 bits number
 */
exports.int8 = function(buff) {
  return buff.readInt8(0);
};

/**
 * Decodes a buffer ordered with little-endian into a signed 16 bits number.
 * Specify `int16le` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The signed 16 bits number
 */
exports.int16le = function(buff) {
  return buff.readInt16LE(0);
};

/**
 * Decodes a buffer ordered with big-endian into a signed 16 bits number.
 * Specify `int16be` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The signed 16 bits number
 */
exports.int16be = function(buff) {
  return buff.readInt16BE(0);
};

/**
 * Decodes a buffer ordered with little-endian into a signed 32 bits number.
 * Specify `int32le` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The signed 32 bits number
 */
exports.int32le = function(buff) {
  return buff.readInt32LE(0);
};

/**
 * Decodes a buffer ordered with big-endian into a signed 32 bits number.
 * Specify `int32be` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The signed 32 bits number
 */
exports.int32be = function(buff) {
  return buff.readInt32BE(0);
};

/**
 * Decodes a buffer ordered as little-endian into a 32 bits float number.
 * Specify `floatle` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The 32 bits number
 */
exports.floatle = function(buff) {
  return buff.readFloatLE(0);
};

/**
 * Decodes a buffer ordered as big-endian into a 32 bits float number.
 * Specify `floatle` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The 32 bits number
 */
exports.floatbe = function(buff) {
  return buff.readFloatBE(0);
};

/**
 * Decodes a buffer ordered as litte-endian into a 64 bits double number.
 * Specify `doublele` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The 64 bits number
 */
exports.doublele = function(buff) {
  return buff.readDoubleLE(0);
};

/**
 * Decodes a buffer ordered as big-endian into a 64 bits double number.
 * Specify `doublebe` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The 64 bits number
 */
exports.doublebe = function(buff) {
  return buff.readDoubleBE(0);
};

/**
 * Decodes a buffer previous encoded as a base 128 varint into a number.
 * Specify `varint` as the field type to use this.
 *
 * @param  {buffer} buff The buffer to be decoded.
 * @return {number}      The number
 */
exports.varint = function(buff) {
  return varint.decode(buff);
};

/**
 * Simply pass along a buffer to the final deserialized object, this way you
 * can have buffers inside your objects. Specify `buffer` as the field type
 * to use this.
 *
 * @param  {buffer} buffer A buffer.
 * @return {number}        A copy of the same buffer.
 */
exports.buffer = function(buffer) {
  return new Buffer(buffer);
};

/**
 * Support for subschemas inside your object, this way we can have complex
 * object serialization.
 *
 * @param  {buffer} buffer The object to be deserialized
 * @param  {object} field  The field with a schema key, so we know what
 *                         subschema we need to use.
 * @param  {object} prev   The current instance of Bolty
 * @return {object}        The deserialized object.
 */
exports.schema = function(buffer, field, prev) {
  var template = new Bolty(prev._schemas[field.schema]);
  template._encoders = prev._encoders;
  template._decoders = prev._decoders;
  template._schemas = prev._schemas;

  return template.decode(buffer);
};
