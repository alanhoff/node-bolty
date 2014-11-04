<a name="Bolty"></a>
#class: Bolty
**Members**

* [class: Bolty](#Bolty)
  * [new Bolty(schema)](#new_Bolty)
  * [bolty.decode(buffer)](#Bolty#decode)
  * [bolty.encode(obj)](#Bolty#encode)
  * [bolty.plugin(obj)](#Bolty#plugin)
  * [bolty.schema(name, fields)](#Bolty#schema)

<a name="new_Bolty"></a>
##new Bolty(schema)
Bolty main class

**Params**

- schema `object` - The main schemma with a name and fields.  

**Example**  
```javascript
var Bolty = require('bolty');
var schema = {
  name: 'string',
  surname: 'string'
};
var template = new Bolty(schema);
```

<a name="Bolty#decode"></a>
##bolty.decode(buffer)
Decode an buffer serialized by Bolty

**Params**

- buffer `buffer` - The buffer to be decoded into an object  

**Returns**: `object` - The object resulting from the decoding  
**Example**  
```javascript
var user = template.decode(<Buffer 01 0c 48 65 6c 6c 6f 20 77 6f 72 ...>);
console.log(user);
```

<a name="Bolty#encode"></a>
##bolty.encode(obj)
Encode an object into a serialized buffer

**Params**

- obj `object` - The object to be serialized  

**Returns**: `buffer` - the resulting buffer  
**Example**  
```javascript
var buff = template.encode({
  firname: 'Alan',
  surname: 'Hoffmeister'
});
```

<a name="Bolty#plugin"></a>
##bolty.plugin(obj)
Add custom encoder/decoder to your schema

**Params**

- obj `object` - The plugin object, we need a `name`, `decoder` and
                     `encoder`  

**Example**  
```javascript
// We will create a plugin to handle MongoDB's ObjectID
var ObjectID = require('mongodb').ObjectID
var Bolty = require('bolty');
var template = new Bolty({
  _id: 'objectid'
});

// Now plug the custom encoder/decoder
template.plugin({
  name: 'objectid' // must be the same as the type
  encoder: function(value){
    return new Buffer(value.toString(), 'hex');
  },
  decoder: function(buff){
    return new ObjectID(buff.toString('hex'));
  }
});
```

<a name="Bolty#schema"></a>
##bolty.schema(name, fields)
Add an aditionar schema to your main schema, so you can have nested objects.

**Params**

- name `string` - The name of the additional schema  
- fields `object` - The fields of this aditional schema  

**Example**  
```javascript
template.schema('info', {
  street: 'string',
  telephone: 'varint'
});
```

