# Bolty
[![Coverage Status](https://img.shields.io/coveralls/alanhoff/node-bolty.svg)](https://coveralls.io/r/alanhoff/node-bolty)
[![Build Status](https://secure.travis-ci.org/alanhoff/node-bolty.png)](https://travis-ci.org/alanhoff/node-bolty)
[![Dependencies Status](https://david-dm.org/alanhoff/node-bolty.png)](https://david-dm.org/alanhoff/node-bolty)
[![DevDependencies Status](https://david-dm.org/alanhoff/node-bolty/dev-status.png)](https://davhttps://developers.google.com/protocol-buffers/id-dm.org/alanhoff/node-bolty)

[![Testling Status](https://ci.testling.com/alanhoff/node-bolty.png)](https://ci.testling.com/alanhoff/node-bolty)

Bolty is a binary object encoder and decoder. Heavelly inspired by
[Protocol Buffers][0], it was designed to handle binary data and generate a
serialization much smaller than JSON objects. Sometimes Bolty can generate a
serialized object ~70% smallers then the same object serialized with JSON.

* [Read the API documentation][1]
* [See the datatypes that Bolty can handle][2]
* [Learn how to encode and decode with examples][3]

### The basics

Bolty works with an object schema, this way we don't need to include the keys
with the serialized object. Also it handle numbers as integers inside a buffer,
not as a string, like JSON does.

This is how you encode a JavaScript object:
```javascript
var Bolty = require('bolty');
var schema = {
  name: 'testing-template', // The name of this template
  fields: {                 // Here we need to list all fields that we want to encode
    time: {                 // We will be expeting a key called time
      id: 1,                // This id must be unique inside the fields
      type: 'date'          // Bolty should parse and decode this field as a date
    }
  }
};

// Now we will create the template
var template = new Bolty(schema);

// That's it, our template is ready to encode and decode
var buff = template.encode({
  time: new Date()
});

var obj = template.decode(buff);
```

The generated binary buffer looks like this: `<Buffer 01 06 e6 f9 ea 9a 97 29>`,
only 8 bytes, against 35 bytes of the same object serialized with JSON.

### The protocol

The protocol is very simple, it consists on 3 parts, one id as varint, one
length as varint too and the data itself. Let's take a look on the previous
example:

```
| What        | Hex               | Description
| ----------- | ----------------- | ------------
| ID          | 01                | The ID, so we know the key name from the schema
| Data length | 06                | The length of the data, so we know when  data ends and another field starts
| The data    | e6 f9 ea 9a 97 29 | The data itself
```

### Contribute

To contribute you can try to find an [issue or enchancment][4] and try to
implement it, fork the project, implement the code, make tests, add yourself
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
