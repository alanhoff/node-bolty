var Bolty = require('../');
var schema = {
  time: 'date',           // The time field will be encoded as a Date object
  awesome: 'boolean' ,    // A simple boolean
  luckyNumber: 'uint16le' // A 16 bits unsigned integer ordered ass litte-endian
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
console.log(obj);

console.log(buff);
console.log(JSON.stringify({
  time: new Date(),
  awesome: true,
  luckyNumber: 8080
}).length);
