<a name="module_encoders"></a>
#encoders
Here are all internal encoders supported by Bolty. They all
receive those parameters `value` as the value found on the encoded object,
`field`  as the field configuration inside the schema and `schema` as the
current Bolty instance being used. All encoders must return a buffer.

**Members**

* [encoders](#module_encoders)
  * [encoders.string(value)](#module_encoders.string)
  * [encoders.uint8(value)](#module_encoders.uint8)
  * [encoders.uint16le(value)](#module_encoders.uint16le)
  * [encoders.uint16be(value)](#module_encoders.uint16be)
  * [encoders.uint32le(value)](#module_encoders.uint32le)
  * [encoders.uint32be(value)](#module_encoders.uint32be)
  * [encoders.int8(value)](#module_encoders.int8)
  * [encoders.int16le(value)](#module_encoders.int16le)
  * [encoders.int16be(value)](#module_encoders.int16be)
  * [encoders.int32le(value)](#module_encoders.int32le)
  * [encoders.int32be(value)](#module_encoders.int32be)
  * [encoders.floatle(value)](#module_encoders.floatle)
  * [encoders.floatbe(value)](#module_encoders.floatbe)
  * [encoders.doublele(value)](#module_encoders.doublele)
  * [encoders.doublebe(value)](#module_encoders.doublebe)
  * [encoders.varint(value)](#module_encoders.varint)
  * [encoders.buffer(buffer)](#module_encoders.buffer)
  * [encoders.date(date)](#module_encoders.date)
  * [encoders.boolean(date)](#module_encoders.boolean)
  * [encoders.schema(obj, field, prev)](#module_encoders.schema)

<a name="module_encoders.string"></a>
##encoders.string(value)
Encodes an UTF8 string into a buffer. Specify `string` as the field type
to use this.

**Params**

- value `string` - The string to be encoded  

**Returns**: `buffer` - The string encoded as a buffer  
<a name="module_encoders.uint8"></a>
##encoders.uint8(value)
Encodes an unsigned 8 bits number inside a buffer with 1 byte. Specify
`uint8` as the field type to use this.

**Params**

- value `number` - The number to be encoded  

**Returns**: `buffer` - The number encoded as a 1 byte buffer  
<a name="module_encoders.uint16le"></a>
##encoders.uint16le(value)
Encodes an unsigned 16 bits value inside a buffer with 2 bytes and ordered as
little-endian. Specify `uint16le` as the field type to use this.

**Params**

- value `number` - The 16 bits number.  

**Returns**: `buffer` - The number encoded as a 2 bytes buffer  
<a name="module_encoders.uint16be"></a>
##encoders.uint16be(value)
Encodes an unsigned 16 bits value inside a buffer with 2 bytes and ordered as
big-endian. Specify `uint16be` as the field type to use this.

**Params**

- value `number` - The 16 bits number.  

**Returns**: `buffer` - The number encoded as a 2 bytes buffer  
<a name="module_encoders.uint32le"></a>
##encoders.uint32le(value)
Encodes an unsigned 32 bits value inside a buffer with 4 bytes and ordered as
little-endian. Specify `uint32le` as the field type to use this.

**Params**

- value `number` - The 32 bits number.  

**Returns**: `buffer` - The number encoded as a 4 bytes buffer  
<a name="module_encoders.uint32be"></a>
##encoders.uint32be(value)
Encodes an unsigned 32 bits value inside a buffer with 4 bytes and ordered as
big-endian. Specify `uint32be` as the field type to use this.

**Params**

- value `number` - The 32 bits number.  

**Returns**: `buffer` - The number encoded as a 4 bytes buffer  
<a name="module_encoders.int8"></a>
##encoders.int8(value)
Encodes a signed 8 bits number inside a buffer with 1 byte. Specify
`uint8` as the field type to use this.

**Params**

- value `number` - The number to be encoded  

**Returns**: `buffer` - The number encoded as a 1 byte buffer  
<a name="module_encoders.int16le"></a>
##encoders.int16le(value)
Encodes a signed 16 bits value inside a buffer with 2 bytes and ordered as
little-endian. Specify `uint16le` as the field type to use this.

**Params**

- value `number` - The 16 bits number.  

**Returns**: `buffer` - The number encoded as a 2 bytes buffer  
<a name="module_encoders.int16be"></a>
##encoders.int16be(value)
Encodes a signed 16 bits value inside a buffer with 2 bytes and ordered as
big-endian. Specify `uint16be` as the field type to use this.

**Params**

- value `number` - The 16 bits number.  

**Returns**: `buffer` - The number encoded as a 2 bytes buffer  
<a name="module_encoders.int32le"></a>
##encoders.int32le(value)
Encodes a signed 32 bits value inside a buffer with 4 bytes and ordered as
little-endian. Specify `uint32le` as the field type to use this.

**Params**

- value `number` - The 32 bits number.  

**Returns**: `buffer` - The number encoded as a 4 bytes buffer  
<a name="module_encoders.int32be"></a>
##encoders.int32be(value)
Encodes a signed 32 bits value inside a buffer with 4 bytes and ordered as
big-endian. Specify `uint32be` as the field type to use this.

**Params**

- value `number` - The 32 bits number.  

**Returns**: `buffer` - The number encoded as a 4 bytes buffer  
<a name="module_encoders.floatle"></a>
##encoders.floatle(value)
Encodes a 32 bits float number inside a buffer with 4 bytes and ordered as
little-endian. Specify `floatle` as the field type to use this.

**Params**

- value `number` - The 32 bits float.  

**Returns**: `buffer` - The number encoded as a 4 bytes buffer  
<a name="module_encoders.floatbe"></a>
##encoders.floatbe(value)
Encodes a 32 bits float number inside a buffer with 4 bytes and ordered as
big-endian. Specify `floatbe` as the field type to use this.

**Params**

- value `number` - The 32 bits float.  

**Returns**: `buffer` - The float encoded as a 4 bytes buffer  
<a name="module_encoders.doublele"></a>
##encoders.doublele(value)
Encodes a 64 bits double number inside a buffer with 8 bytes and ordered as
little-endian. Specify `doublele` as the field type to use this.

**Params**

- value `number` - The 64 bits double.  

**Returns**: `buffer` - The double encoded as a 8 bytes buffer  
<a name="module_encoders.doublebe"></a>
##encoders.doublebe(value)
Encodes a 64 bits double number inside a buffer with 8 bytes and ordered as
big-endian. Specify `doublebe` as the field type to use this.

**Params**

- value `number` - The 64 bits float.  

**Returns**: `buffer` - The double encoded as a 8 bytes buffer  
<a name="module_encoders.varint"></a>
##encoders.varint(value)
Encodes number as a base 128 encoded varint. Specify `varint` as the
field type to use this.

**Params**

- value `number` - The number.  

**Returns**: `buffer` - A buffer representing the base 128 varint  
<a name="module_encoders.buffer"></a>
##encoders.buffer(buffer)
Simply pass along a buffer to the final serialized buffer, this way you
can have buffers inside your objects. Specify `buffer` as the field type
to use this.

**Params**

- buffer `buffer` - The buffer  

**Returns**: `buffer` - A copy of the buffer  
<a name="module_encoders.date"></a>
##encoders.date(date)
Convert a `Date` object to number and to a varint.

**Params**

- date `date` - The date to be encoded  

**Returns**: `buffer` - A buffer from the date  
<a name="module_encoders.boolean"></a>
##encoders.boolean(date)
Convert a `Boolean` to a buffer.

**Params**

- date `date` - The date to be encoded  

**Returns**: `buffer` - A buffer from the date  
<a name="module_encoders.schema"></a>
##encoders.schema(obj, field, prev)
Support for subschemas inside your object, this way we can have complex
object serialization.

**Params**

- obj `object` - The object to be serialized  
- field `object` - The field with a schema key, so we know what subschema
                       we need to use.  
- prev `object` - The current instance of Bolty  

**Returns**: `buffer` - A serialized Bolty buffer  
