var Stream = require('stream');

function naptan() {

  var that = this;

  that.stops = [];
  that.counter = 0;
  that.timer = new Date();

  function Stop() {
    return {
      naptanCode : null,
      town : null,
      street : null,
      latitude : null,
      longitude : null
    };
  }

  that.currentStop = null;
  that.currentTag = null;

  that.createStop = function () {
    that.currentStop = new Stop();
  };

  that.finishStop = function () {
    that.stops.push(this.currentStop);
    that.currentStop = null;
  };

  var s = new Stream();
  s.writable = true;
  s.readable = true;
  
  /* emit array starter */
  s.emit('data', '[ \n');

  var saxStream = require("sax").createStream(false, {});

  /* Emits openning tags */
  saxStream.on('opentag', function (tag) {
    if (tag.name === 'STOPPOINT') {
      that.createStop();
    }
    that.currentTag = tag.name;
  });

  /* Emits text elements  */
  saxStream.on('text', function (text) {
    if (that.currentTag && that.currentStop) {
      switch (that.currentTag) {
        case ('NAPTANCODE') :
          that.currentStop.naptanCode = text;
          break;
        case ('STREET'):
          that.currentStop.street = text;
          break;
        case ('TOWN'):
          that.currentStop.town = text;
          break;
        case 'LATITUDE':
          that.currentStop.latitude = text;
          break;
        case 'LONGITUDE':
          that.currentStop.longitude = text;
          break;
        case 'PLACE':
          that.currentStop.place = text;
          break;
        case 'LOCALITYCENTRE':
          that.currentStop.localityCentre = text;
          break;
        case 'LOCATION':
          that.currentStop.location = text;
          break;
        case 'SUBURB':
          that.currentStop.suburb = text;
          break;
      }
    }
  });

  /* Emits closing tags */
  saxStream.on('closetag', function (tagName) {
    if (tagName === 'STOPPOINT') {
      s.emit('data', JSON.stringify(that.currentStop) + ', \n');
      that.finishStop();
    }

  });

  /* Emits when the end of stream is reached */
  saxStream.on('end', function () {
    console.log('end');
  });

  s.write = function (buf) {
    saxStream.write(buf);
  };

  s.end = function (buf) {
    if (arguments.length) {
      s.write(buf);
    }
    s.emit('data', '] \n');
    s.writable = false;
  };

  s.destroy = function () {
    s.writable = false;
  };

  return s;
}

module.exports = naptan;