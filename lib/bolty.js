var encoders = require('./encoders');
var decoders = require('./decoders');
var varint = require('varint');

var Bolty = function(schema) {
  this._schema = schema;
  this._decoders = decoders;
  this._encoders = encoders;
};

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
        .apply(null, [data.data, this]);
    }
  }

  return obj;
};

Bolty.prototype.encode = function(obj) {
  var buffer = [];

  for (var key in obj) {
    var field = this._schema.fields[key];

    if (field) {
      var value = this._encoders[field.type]
        .apply(null, [obj[key], this]);

      var id = new Buffer(varint.encode(field.id));
      var length = new Buffer(varint.encode(value.length));

      buffer.push(Buffer.concat([id, length, value]));
    }
  }

  return Buffer.concat(buffer);
};

module.exports = Bolty;
