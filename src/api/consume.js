var http = require('http');
var fs = require('fs');

poll();
setInterval(poll, 5000);

function poll(){
  http.get("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=132", function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      if(body.return !== false){
        var value = JSON.parse(body);
        console.log(value);
        fs.writeFile('src/api/doge.json', '{"btc": ' + value.return.markets.DOGE.lasttradeprice + '}', function (err) {
          if (err) throw err;
        });
      } else {
        console.log('error');
      }
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}
