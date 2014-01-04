(function() {
    // Localize jQuery variable
  var jQuery;

  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.10.1') {
      var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src",
          "https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js");
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
  }
    /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
      // Restore $ and window.jQuery to their previous values and store the
      // new jQuery in our local jQuery variable
      jQuery = window.jQuery.noConflict(true);
      // Call our main function
      main();
  }

    /******** Our main function ********/
  function main() {
      jQuery(document).ready(function($) {
          /******* Load CSS *******/
          var css_link = $("<link>", {
              rel: "stylesheet",
              type: "text/css",
              href: "style.css"
          });
          css_link.appendTo('head');

          /******* Load HTML *******/
          var dogeApiUrl = 'https://lit-beach-8985.herokuapp.com/?callback=?&url=http%3A%2F%2Fpubapi.cryptsy.com%2Fapi.php%3Fmethod%3Dsinglemarketdata%26marketid%3D132';
          $.getJSON(dogeApiUrl, function(data){
            $("#wow-such").html(data.return.markets.DOGE.lasttradeprice);
          });

          function poll(){
            $.getJSON(dogeApiUrl, function(data){
              $("#wow-such").html(data.return.markets.DOGE.lasttradeprice);
            });
          }

          setInterval(function(){ poll(); }, 5000);
      });
  }

}) ();