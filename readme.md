# Bolty
[![Coverage Status](https://img.shields.io/coveralls/alanhoff/node-bolty.svg)](https://coveralls.io/r/alanhoff/node-bolty)
[![Build Status](https://secure.travis-ci.org/alanhoff/node-bolty.png)](https://travis-ci.org/alanhoff/node-bolty)
[![Dependencies Status](https://david-dm.org/alanhoff/node-bolty.png)](https://david-dm.org/alanhoff/node-bolty)
[![DevDependencies Status](https://david-dm.org/alanhoff/node-bolty/dev-status.png)](https://davhttps://developers.google.com/protocol-buffers/id-dm.org/alanhoff/node-bolty)

[![Testling Status](https://ci.testling.com/alanhoff/node-bolty.png)](https://ci.testling.com/alanhoff/node-bolty)

Bolty is a binary object encoder and decoder. Heavily inspired by
[Protocol Buffers][0], it was designed to handle binary data and generate a
serialization much smaller than JSON objects. Sometimes Bolty can generate a
serialized object ~70% smallers then the same object serialized with JSON.

* [Read the API documentation][1]
* [See the datatypes that Bolty can handle][2]
* [Learn how to encode and decode with examples][3]

### The basics

Bolty works with an object schema, this way we don't need to include the keys
inside the serialized buffer. Also it handles numbers as integers inside a
buffer, not as a string, like JSON does. This is how you encode a JavaScript
to a binary buffer:

```javascript
var Bolty = require('bolty');
var schema = {
  time: 'date',           // The time field will be encoded as a Date object
  awesome: 'boolean',     // A simple boolean
  luckyNumber: 'uint16le' // A 16 bits unsigned integer ordered as litte-endian
};

// Now we will create the template
var template = new Bolty(schema);

// That's it, our template is ready to encode and decode
var buff = template.encode({
  time: new Date(),
  awesome: true,
  luckyNumber: 8080
});

var obj = template.decode(buff);

/*
 { time: Date(Tue Nov 04 2014 10:21:02 GMT-0200)
   awesome: true,
   luckyNumber: 8080 }
*/
```

The generated binary buffer looks like this: `<Buffer 00 06 f6 a8 9b d8 97 29 01 01 31 02 02 90 1f>`,
only 15 bytes, against 69 bytes of the same object serialized with JSON.

### In the browser

You can install Bolty with `bower install bolty` and then use it inside
your scripts.

```html
<script src="dist/bolty-bundle.min.js"></script>
<!-- Or if you already have Buffer included your page -->
<script src="dist/bolty.min.js"></script>
```

### The protocol

The protocol is very simple, it consists on 3 parts, one id as varint, one
length as varint and the data itself. Let's take a look on the previous
example:

```
| What        | Hex               | Description
| ----------- | ----------------- | ------------
| ID          | 01                | The ID, so we know the key name from the schema
| Data length | 06                | The length of the data, so we know when  data ends and another field starts
| The data    | a8 9b d8 97 29 01 | The data itself from the first key
```

### Custom encoders and decoders

You can create custom encoders and decoders to serialize and deserialize your
objects. In this example we will create a custom plugin to encode and decode
ObjectIDs from MongoDB.

```javascript
 var ObjectID = require('mongodb').ObjectID
 var Bolty = require('bolty');
 var template = new Bolty({
   _id: 'objectid'
 });

 // Now plug the custom encoder/decoder
 template.plugin({
   name: 'objectid' // must be the same as the type
   encoder: function(value){
     // Encoders always reveive a value and must return a buffer
     return new Buffer(value.toString(), 'hex');
   },
   decoder: function(buff){
     // Decoders always receive buffers and must return a value
     return new ObjectID(buff.toString('hex'));
   }
 });
```

### Subschema for nested objects

Bolty support nested objects by adding subtemplates:

```javascript
// Create a template that depends on a subschema
var template = new Bolty({
  name: 'string',
  surname: 'string',
  info: {
    type: 'schema',
    schema: 'info'
  }
});

// Add that subschema
template.schema('info', {
  street: 'string',
  number: 'varint'
});

// Now you can encode your nested object
template.encode({
  name: 'John',
  surname: 'Doe',
  info: {
    street: '1st Avenue',
    number: 8080
  }
});
```

### Contribute

To contribute you can try to find an [issue or enchancment][4] and try to
implement it. Fork the project, implement the code, make tests, add yourself
to the [contributors][5] list and send the PR to the master branch.

### Testing

For testing you will need to have [Grunt][6] installed on your computer, after
that you can run `grunt test` inside the root folder of this project.

### License

Copyright (c) 2014, Alan Hoffmeister <alanhoffmeister@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

[0]: https://developers.google.com/protocol-buffers/
[1]: docs/api.md
[2]: docs/encoders.md
[3]: examples
[4]: https://github.com/alanhoff/node-bolty/issues?q=is%3Aopen+is%3Aenchancement+is%3Abug
[5]: contributors.md
[6]: http://gruntjs.com/
