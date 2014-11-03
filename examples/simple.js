var Bolty = require('../');
var schema = {
  name: 'testing-template', // The name of this template
  fields: { // Here we need to list all fields that we wan't to encode
    time: { // We will be expeting a key called time
      id: 1,       // This id must be unique inside the fields
      type: 'date' // Bolty should parse and decode this field as a date
    }
  }
};

// Now we will create the template
var template = new Bolty(schema);

// That's it, our template is ready to encode and decode
var buff = template.encode({
  time: new Date()
});

console.log(buff);

var obj = template.decode(buff);
console.log(obj);
console.log(JSON.stringify({
  time: new Date()
}).length);
