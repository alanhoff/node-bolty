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
