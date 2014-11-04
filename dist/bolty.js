/*
 Bolty v2.0.0 generated at 2014/11/4 13:11:28
 Please report issues to https://github.com/alanhoff/node-bolty/issues
 ISC License
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (Buffer){
var encoders = require('./encoders');
var decoders = require('./decoders');
var varint = require('varint');

/**
 * Bolty main class
 * @class
 * @param {object} schema The main schmma.
 * @example
 * ```javascript
 * var Bolty = require('bolty');
 * var schema = {
 *   name: 'string',
 *   surname: 'string'
 * };
 * var template = new Bolty(schema);
 * ```
 */
var Bolty = function(schema) {
  this._decoders = decoders;
  this._encoders = encoders;
  this._schemas = {};

  // Allow to pass the fields direclty
  if(Object.keys(schema).join(',') !== 'name,fields'){
    schema = {
      name: '_auto-' + new Date().getTime(),
      fields: schema
    };
  }

  this._schema = schema;
  this._fieldIndex = Object.keys(schema.fields);
  this._schemas[schema.name] = schema;
};

/**
 * Decode a buffer serialized by Bolty
 * @param  {buffer} buffer The buffer to be decoded into an object
 * @return {object}        The object resulting from the decoding
 * @example
 * ```javascript
 * var user = template.decode(<Buffer 01 0c 48 65 6c 6c 6f 20 77 6f 72 ...>);
 * console.log(user);
 * ```
 */
Bolty.prototype.decode = function(buffer) {
  var cursor = 0;
  var obj = {};

  while (cursor < buffer.length) {
    var data = {
      id: null,
      length: null,
      data: null
    };

    data.id = varint.decode(buffer, cursor);
    cursor += varint.decode.bytes;

    data.length = varint.decode(buffer, cursor);
    cursor += varint.decode.bytes;

    data.data = new Buffer(buffer.slice(cursor, cursor + data.length));
    cursor += data.length;

    for (var key in this._schema.fields) {
      var field = this._schema.fields[key];
      var id = field.id || this._fieldIndex.indexOf(key);

      if (id === data.id)
        obj[key] = this._decoders[field.type || field]
        .apply(null, [data.data, field, this]);
    }
  }

  return obj;
};

/**
 * Encode an object into a serialized buffer
 * @param  {object} obj The object to be serialized
 * @return {buffer}     The resulting buffer
 * @example
 * ```javascript
 * var buff = template.encode({
 *   firname: 'Alan',
 *   surname: 'Hoffmeister'
 * });
 * ```
 */
Bolty.prototype.encode = function(obj) {
  var buffer = [];
  var _id = 0;

  for (var key in obj) {
    var field = this._schema.fields[key];

    if (field) {
      var value = this._encoders[field.type || field]
        .apply(null, [obj[key], field, this]);

      var id = new Buffer(varint.encode(field.id || _id++));
      var length = new Buffer(varint.encode(value.length));

      buffer.push(Buffer.concat([id, length, value]));
    }
  }

  return Buffer.concat(buffer);
};

/**
 * Add custom encoder/decoder to your schema
 * @param  {object} obj The plugin object, we need a `name`, `decoder` and
 *                      `encoder`
 * @example
 * ```javascript
 * // We will create a plugin to handle MongoDB's ObjectID
 * var ObjectID = require('mongodb').ObjectID
 * var Bolty = require('bolty');
 * var template = new Bolty({
 *   _id: 'objectid'
 * });
 *
 * // Now plug the custom encoder/decoder
 * template.plugin({
 *   name: 'objectid' // must be the same as the type
 *   encoder: function(value){
 *     return new Buffer(value.toString(), 'hex');
 *   },
 *   decoder: function(buff){
 *     return new ObjectID(buff.toString('hex'));
 *   }
 * });
 * ```
 */
Bolty.prototype.plugin = function(obj) {
  this._encoders[obj.name] = obj.encoder;
  this._decoders[obj.name] = obj.decoder;
};

/**
 * Add an additional schema to your main schema, so you can have nested objects.
 * @param  {string} name   The name of the additional schema
 * @param  {object} fields The fields of this aditional schema
 * @example
 * ```javascript
 * template.schema('info', {
 *   street: 'string',
 *   telephone: 'varint'
 * });
 * ```
 */
Bolty.prototype.schema = function(name, fields) {
  this._schemas[name] = {
    name: name,
    fields: fields
  };
};

module.exports = Bolty;

}).call(this,require("buffer").Buffer)
},{"./decoders":2,"./encoders":3,"buffer":"buffer","varint":6}],2:[function(require,module,exports){
(function (Buffer){
var varint = require('varint');

/**
 * Here are all internal decoders supported by Bolty. They all
 * receive this parameters: `buff` as the buffer extracted from the serialized
 * buffer, `field` as the field configuration inside the schema and `schema`
 * as the current Bolty instance being used. All encoders must return the
 * decoded value.
 *
 * @module
 */

/**
 * Decodes a buffer into an UTF8 string. Specify `string` as the field type
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
 * Convert a buffer to a `Date` object.
 *
 * @param  {buffer} buffer A buffer.
 * @return {number}        A `Date` object.
 */
exports.date = function(buffer) {
  return new Date(varint.decode(buffer));
};

/**
 * Convert a  buffer to a `Boolean`.
 *
 * @param  {date}  date The date to be encoded
 * @return {buffer}     A buffer from the date
 */
exports.boolean = function(buffer) {
  return Boolean(Number(buffer.toString()));
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
  var Bolty = require('../'); // Circular dependencies sucks..
  var template = new Bolty(prev._schemas[field.schema]);
  template._encoders = prev._encoders;
  template._decoders = prev._decoders;
  template._schemas = prev._schemas;

  return template.decode(buffer);
};

}).call(this,require("buffer").Buffer)
},{"../":1,"buffer":"buffer","varint":6}],3:[function(require,module,exports){
(function (Buffer){
var varint = require('varint');

/**
 * Here are all internal encoders supported by Bolty. They all
 * receive this parameters `value` as the value found on the encoded object,
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

}).call(this,require("buffer").Buffer)
},{"../":1,"buffer":"buffer","varint":6}],4:[function(require,module,exports){
module.exports = read

var MSB = 0x80
  , REST = 0x7F

function read(buf, offset) {
  var res    = 0
    , offset = offset || 0
    , shift  = 0
    , counter = offset
    , b
    , l = buf.length
  
  do {
    if(counter >= l) {
      read.bytesRead = 0
      return undefined
    }
    b = buf[counter++]
    res += shift < 28
      ? (b & REST) << shift
      : (b & REST) * Math.pow(2, shift)
    shift += 7
  } while (b >= MSB)
  
  read.bytes = counter - offset
  
  return res
}

},{}],5:[function(require,module,exports){
module.exports = encode

var MSB = 0x80
  , REST = 0x7F
  , MSBALL = ~REST
  , INT = Math.pow(2, 31)

function encode(num, out, offset) {
  out = out || []
  offset = offset || 0
  var oldOffset = offset

  while(num >= INT) {
    out[offset++] = (num & 0xFF) | MSB
    num /= 128
  }
  while(num & MSBALL) {
    out[offset++] = (num & 0xFF) | MSB
    num >>>= 7
  }
  out[offset] = num | 0
  
  encode.bytes = offset - oldOffset + 1
  
  return out
}

},{}],6:[function(require,module,exports){
module.exports = {
    encode: require('./encode.js')
  , decode: require('./decode.js')
  , encodingLength: require('./length.js')
}

},{"./decode.js":4,"./encode.js":5,"./length.js":7}],7:[function(require,module,exports){

var N1 = Math.pow(2,  7)
var N2 = Math.pow(2, 14)
var N3 = Math.pow(2, 21)
var N4 = Math.pow(2, 28)
var N5 = Math.pow(2, 35)
var N6 = Math.pow(2, 42)
var N7 = Math.pow(2, 49)

module.exports = function (value) {
  return (
    value < N1 ? 1
  : value < N2 ? 2
  : value < N3 ? 3
  : value < N4 ? 4
  : value < N5 ? 5
  : value < N6 ? 6
  : value < N7 ? 7
  :              8
  )
}

},{}]},{},[1]);
