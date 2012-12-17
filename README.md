NaptanXMLToJsonStreamingParser
==============================

Takes a stream of NaPTAN xml data and transforms it to a JSON writable stream


Example
=======
- Requires the NaPTAN.xml from http://data.gov.uk/dataset/naptan
- Warning: It takes a long time with the raw xml, as it's a big file.

```node
  var fs = require('fs');
  var naptanParse = require('./index.js');

  fs.createReadStream('./NaPTAN.xml').pipe(naptanParse()).pipe(fs.createWriteStream('./naptan.json'));
```