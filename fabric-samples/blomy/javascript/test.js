var tp = {"Timestamp":{
    "seconds": {
    "low": 1570417284,
    "high": 0,
    "unsigned": false
   },
    "nanos": 435000000
   }};

function toDate(timestamp) {
    const milliseconds = (timestamp.seconds.low + ((timestamp.nanos / 1000000) / 1000)) * 1000;
    return new Date(milliseconds);
  }

console.log(toDate(tp.Timestamp));