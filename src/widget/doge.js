(function() {
  var jQuery;
  var previousValue = null;

  // load jQuery if it hasn't already been loaded in
  // @TODO - remove dependency on jQuery
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.10.1') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          scriptLoadHandler();
        }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else {
      // The jQuery version on the window is the one we want to use
      jQuery = window.jQuery;
      main();
    };

  // called once jQuery loaded
  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main();
  }

  // main function
  function main() {
    jQuery(document).ready(function($) {
      // load css
      var css_link = $("<link>", {
          rel: "stylesheet",
          type: "text/css",
          href: "style.css"
      });
      css_link.appendTo('head');


      // overlay while data is loading
      $("#wow-such-widget").html('<div id="wow-such-widget-overlay"></div><div id="wow-such-widget-lower-bar"></div>');
      $('#wow-such-widget-overlay').html('Loading live Dogecoin price...');

      var dogeApiUrl = 'https://lit-beach-8985.herokuapp.com/?callback=?&url=http%3A%2F%2Fpubapi.cryptsy.com%2Fapi.php%3Fmethod%3Dsinglemarketdata%26marketid%3D132';

      // poll api for data, remove overlay on successful retrieval, flash on price change
      function poll(){
        $.getJSON(dogeApiUrl, function(data){
          var data = data.return.markets.DOGE.lasttradeprice;
          $("#wow-such-widget-overlay").remove();
          $('#wow-such-widget').html('<div id="wow-such-widget-inner">1 DOGE = <span id="wow-such-widget-inner-price"></span> BTC</div><div id="wow-such-widget-credit">Powered by <a href="http://wowsuch.io" target="_blank">wowsuch.io</a></div><div id="wow-such-widget-lower-bar"></div>');

            if(data !== previousValue && previousValue) {

              $("#wow-such-widget-inner-price").addClass('wow-such-widget-animate');
              setTimeout(function(){
                $("#wow-such-widget-inner-price").removeClass('wow-such-widget-animate');
              }, 2000);
            };

          $("#wow-such-widget-inner-price").html(data);
          previousValue = data;
        });
      }

      // call poll function initially and periodically
      poll();
      setInterval(poll, 5000);
    });
  }

})();