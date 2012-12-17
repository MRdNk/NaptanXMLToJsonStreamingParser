NaptanXMLToJsonStreamingParser
==============================

Takes a stream of NaPTAN xml data and transforms it to a JSON writable stream


Example
=======
- Requires the NaPTAN.xml from http://data.gov.uk/dataset/naptan
- Warning: It takes a long time with the raw xml, as it's a big file.

fs.createReadStream('./NaPTAN.xml').pipe(naptan()).pipe(fs.createWriteStream('./naptan.json'));