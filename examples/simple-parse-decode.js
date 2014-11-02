var Bolty = require('..');
var msgpack = require('msgpack');
var hello = new Bolty({
  name: 'hello',
  fields: {
    hello: {
      id: 1,
      type: 'string'
    },
    birthday: {
      id: 2,
      type: 'uint32le'
    },
    timestamp: {
      id: 3,
      type: 'varint'
    }
  }
});

var buff = hello.encode({
  hello: 'Hello world!',
  birthday: 20141102,
  timestamp: new Date().getTime()
});

var json = {
  hello: 'Hello world!',
  birthday: 20141102,
  timestamp: new Date().getTime()
};

console.log('Bolty buffer');
console.log(buff);

console.log('Bolty size: %s', buff.length);
console.log('JSON size: %s', JSON.stringify(json).length);
console.log('MSGPACK size:', msgpack.pack(json).length);
