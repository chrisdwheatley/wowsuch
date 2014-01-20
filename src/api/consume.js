var http = require('http');
var fs = require('fs');

http.get("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=132", function(res) {
  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    var value = JSON.parse(body);
    console.log('new value written');
    fs.writeFile('src/api/doge.json', '{"btc": ' + value.return.markets.DOGE.lasttradeprice + '}', function (err) {
      if (err) throw err;
    });
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
