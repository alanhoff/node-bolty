<a name="module_decoders"></a>
#decoders
Here are all internal decoders supported by Bolty. They all
receive those parameters: `buff` as the buffer extracted from the serialized
buffer, `field` as the field configuration inside the schema and `schema`
as the current Bolty instance being used. All encoders must return the
decoded value.

**Members**

* [decoders](#module_decoders)
  * [decoders.string(buff)](#module_decoders.string)
  * [decoders.uint8(buff)](#module_decoders.uint8)
  * [decoders.uint16le(buff)](#module_decoders.uint16le)
  * [decoders.uint16be(buff)](#module_decoders.uint16be)
  * [decoders.uint32le(buff)](#module_decoders.uint32le)
  * [decoders.uint32be(buff)](#module_decoders.uint32be)
  * [decoders.int8(buff)](#module_decoders.int8)
  * [decoders.int16le(buff)](#module_decoders.int16le)
  * [decoders.int16be(buff)](#module_decoders.int16be)
  * [decoders.int32le(buff)](#module_decoders.int32le)
  * [decoders.int32be(buff)](#module_decoders.int32be)
  * [decoders.floatle(buff)](#module_decoders.floatle)
  * [decoders.floatbe(buff)](#module_decoders.floatbe)
  * [decoders.doublele(buff)](#module_decoders.doublele)
  * [decoders.doublebe(buff)](#module_decoders.doublebe)
  * [decoders.varint(buff)](#module_decoders.varint)
  * [decoders.buffer(buffer)](#module_decoders.buffer)
  * [decoders.date(buffer)](#module_decoders.date)
  * [decoders.boolean(date)](#module_decoders.boolean)
  * [decoders.schema(buffer, field, prev)](#module_decoders.schema)

<a name="module_decoders.string"></a>
##decoders.string(buff)
Decodes a buffer into a UTF8 string. Specify `string` as the field type
to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `string` - The string decoded  
<a name="module_decoders.uint8"></a>
##decoders.uint8(buff)
Decodes a buffer into an unsigned 8 bits number. Specify `uint8` as the
field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `string` - The unsigned 8 bits number  
<a name="module_decoders.uint16le"></a>
##decoders.uint16le(buff)
Decodes a buffer ordered with little-endian into an unsigned 16 bits number.
Specify `uint16le` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The unsigned 16 bits number  
<a name="module_decoders.uint16be"></a>
##decoders.uint16be(buff)
Decodes a buffer ordered with big-endian into an unsigned 16 bits number.
Specify `uint16be` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The unsigned 16 bits number  
<a name="module_decoders.uint32le"></a>
##decoders.uint32le(buff)
Decodes a buffer ordered with little-endian into an unsigned 32 bits number.
Specify `uint32le` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The unsigned 32 bits number  
<a name="module_decoders.uint32be"></a>
##decoders.uint32be(buff)
Decodes a buffer ordered with big-endian into an unsigned 32 bits number.
Specify `uint32be` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The unsigned 32 bits number  
<a name="module_decoders.int8"></a>
##decoders.int8(buff)
Decodes a buffer into a signed 8 bits number. Specify `int8` as the
field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `string` - The signed 8 bits number  
<a name="module_decoders.int16le"></a>
##decoders.int16le(buff)
Decodes a buffer ordered with little-endian into a signed 16 bits number.
Specify `int16le` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The signed 16 bits number  
<a name="module_decoders.int16be"></a>
##decoders.int16be(buff)
Decodes a buffer ordered with big-endian into a signed 16 bits number.
Specify `int16be` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The signed 16 bits number  
<a name="module_decoders.int32le"></a>
##decoders.int32le(buff)
Decodes a buffer ordered with little-endian into a signed 32 bits number.
Specify `int32le` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The signed 32 bits number  
<a name="module_decoders.int32be"></a>
##decoders.int32be(buff)
Decodes a buffer ordered with big-endian into a signed 32 bits number.
Specify `int32be` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The signed 32 bits number  
<a name="module_decoders.floatle"></a>
##decoders.floatle(buff)
Decodes a buffer ordered as little-endian into a 32 bits float number.
Specify `floatle` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The 32 bits number  
<a name="module_decoders.floatbe"></a>
##decoders.floatbe(buff)
Decodes a buffer ordered as big-endian into a 32 bits float number.
Specify `floatle` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The 32 bits number  
<a name="module_decoders.doublele"></a>
##decoders.doublele(buff)
Decodes a buffer ordered as litte-endian into a 64 bits double number.
Specify `doublele` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The 64 bits number  
<a name="module_decoders.doublebe"></a>
##decoders.doublebe(buff)
Decodes a buffer ordered as big-endian into a 64 bits double number.
Specify `doublebe` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The 64 bits number  
<a name="module_decoders.varint"></a>
##decoders.varint(buff)
Decodes a buffer previous encoded as a base 128 varint into a number.
Specify `varint` as the field type to use this.

**Params**

- buff `buffer` - The buffer to be decoded.  

**Returns**: `number` - The number  
<a name="module_decoders.buffer"></a>
##decoders.buffer(buffer)
Simply pass along a buffer to the final deserialized object, this way you
can have buffers inside your objects. Specify `buffer` as the field type
to use this.

**Params**

- buffer `buffer` - A buffer.  

**Returns**: `number` - A copy of the same buffer.  
<a name="module_decoders.date"></a>
##decoders.date(buffer)
Convert a buffer to a `Date` object.

**Params**

- buffer `buffer` - A buffer.  

**Returns**: `number` - A `Date` object.  
<a name="module_decoders.boolean"></a>
##decoders.boolean(date)
Convert a  buffer to a `Boolean`.

**Params**

- date `date` - The date to be encoded  

**Returns**: `buffer` - A buffer from the date  
<a name="module_decoders.schema"></a>
##decoders.schema(buffer, field, prev)
Support for subschemas inside your object, this way we can have complex
object serialization.

**Params**

- buffer `buffer` - The object to be deserialized  
- field `object` - The field with a schema key, so we know what
                        subschema we need to use.  
- prev `object` - The current instance of Bolty  

**Returns**: `object` - The deserialized object.  
