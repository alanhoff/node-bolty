var Bolty = require('..');
var hello = new Bolty({
  name: 'hello',
  fields: {
    hello: {
      id: 66661,
      type: 'string'
    },
    birthday: {
      id: 66662,
      type: 'uint32le'
    },
    timestamp: {
      id: 66663,
      type: 'varint'
    }
  }
});

var buff = hello.encode({
  hello: 'Hello world!',
  birthday: 20141102,
  timestamp: new Date().getTime()
});

var json = JSON.stringify({
  hello: 'Hello world!',
  birthday: 20141102,
  timestamp: new Date().getTime()
});

console.log('Bolty buffer');
console.log(buff);

console.log('Bolty size: %s', buff.length);
console.log('JSON size: %s', json.length);
