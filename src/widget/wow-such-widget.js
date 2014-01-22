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
        href: "widget/wow-such-widget.css"
      });
      css_link.appendTo('head');

      // widget boilerplate until data loads
      $(".wow-such-widget").html('<div class="wow-such-widget-overlay"></div><div class="wow-such-widget-lower-bar"></div>');

      var dogeApiUrl = 'https://lit-beach-8985.herokuapp.com/?callback=?&url=https://www.coins-e.com/api/v2/market/DOGE_BTC/depth';

      // poll api for data and display contents of widget on retrieval, flash on price change
      function poll(){
        $.getJSON(dogeApiUrl, function(data){
          var data = data.ltp;
          $('.wow-such-widget').html('<div class="wow-such-widget-inner">1 DOGE = <span class="wow-such-widget-inner-price"></span> BTC</div><div class="wow-such-widget-credit">Powered by <a href="http://wowsuch.io/?utm_source='+ document.URL +'&utm_medium=widget&utm_campaign=wowsuchwidget" target="_blank">wowsuch.io</a></div><div class="wow-such-widget-lower-bar"></div>');

            if(data !== previousValue && previousValue) {
              $(".wow-such-widget-inner-price").addClass('wow-such-widget-animate');
              setTimeout(function(){
                $(".wow-such-widget-inner-price").removeClass('wow-such-widget-animate');
              }, 2000);
            };

          $(".wow-such-widget-inner-price").html(data);
          previousValue = data;
        });
      }

      // call poll function initially and periodically
      poll();
      setInterval(poll, 10000);
    });
  }
})();