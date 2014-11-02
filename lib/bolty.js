var encoders = require('./encoders');
var decoders = require('./decoders');
var varint = require('varint');

/**
 * Bolty main class
 * @class
 * @param {object} schema The main schemma with a name and fields.
 * @example
 * ```javascript
 * var Bolty = require('bolty');
 * var schema = {
 *   name: 'mySchema',
 *   fields: {
 *     firstname: {
 *       id: 1,
 *       type: 'string'
 *     },
 *     surname: {
 *       id: 2,
 *       type: 'string'
 *     }
 *   }
 * };
 * var myTemplate = new Bolty(schema);
 * ```
 */
var Bolty = function(schema) {
  this._schema = schema;
  this._decoders = decoders;
  this._encoders = encoders;
  this._schemas = {};

  this._schemas[schema.name] = schema;
};

/**
 * Decode an buffer serialized by Bolty
 * @param  {buffer} buffer The buffer to be decoded into an object
 * @return {object}        The object resulting from the decoding
 * @example
 * ```javascript
 * var user = myTemplate.decode(<Buffer 01 0c 48 65 6c 6c 6f 20 77 6f 72 ...>);
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

      if (field.id === data.id)
        obj[key] = this._decoders[field.type]
        .apply(null, [data.data, field, this]);
    }
  }

  return obj;
};

/**
 * Encode an object into a serialized buffer
 * @param  {object} obj The object to be serialized
 * @return {buffer}     the resulting buffer
 * @example
 * ```javascript
 * var buff = myTemplate.encode({
 *   firname: 'Alan',
 *   surname: 'Hoffmeister'
 * });
 * ```
 */
Bolty.prototype.encode = function(obj) {
  var buffer = [];

  for (var key in obj) {
    var field = this._schema.fields[key];

    if (field) {
      var value = this._encoders[field.type]
        .apply(null, [obj[key], field, this]);

      var id = new Buffer(varint.encode(field.id));
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
 * var mySchema = new Bolty({
 *   name: 'mongodb-testing',
 *   fileds: {
 *     _id: {
 *       id: 1,
 *       type: 'objectid'
 *     }
 *   }
 * });
 *
 * // Now plug the custom encoder/decoder
 * mySchema.plugin({
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
Bolty.prototype.plugin = function(obj){
  this._encoders[obj.name] = obj.encoder;
  this._decoders[obj.name] = obj.decoder;
};

/**
 * Add an aditionar schema to your main schema, so you can have nested objects.
 * @param  {object} schema the aditional schema
 * @example
 * ```javascript
 * mySchema.schema({
 *   name: 'aditional-schema',
 *   fields: {
 *     street: {
 *       id: 1,
 *       type: 'string'
 *     },
 *     telephone: {
 *       ìd: 2,
 *       type: 'varint'
 *     }
 *   }
 * });
 * ```
 */
Bolty.prototype.schema = function(schema){
  this._schemas[schema.name] = schema;
};

module.exports = Bolty;
