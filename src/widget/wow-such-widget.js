(function() {
  // If people have multiple widgets on a page, including script tags, only one of these things is requried to update them all
  if (window.wowSuchInit) return;
  window.wowSuchInit = true;
  
  var previousValue = null;
  var dogeApiUrl = 'https://lit-beach-8985.herokuapp.com/?url=https://www.coins-e.com/api/v2/market/DOGE_BTC/depth';
  
  function getJSONP(url, callback) {
    var c = 'gjsonp' + Date.now().toString().substr(-4) + Math.random().toString().substr(2, 6);
    
    // URL already has a query string
    if (url.indexOf('?') >= 0) {
      // Already has the callback parameter
      if (url.indexOf('callback=') > 0) {
        url = url.replace(/callback=[^&]*/, 'callback=' + c);
      } else {
        url += ('&callback=' + c);
      }
    } else {
      url += ('?callback=' + c);
    }
    
    var scriptTag = document.createElement('script');
    scriptTag.async = 1;
    scriptTag.src = url;
    
    window[c] = function(data) {
      // Call it
      callback(data);
      
      // Clean up the script tag
      scriptTag.parentNode.removeChild(scriptTag);
      
      // Delete this callback
      delete window[c];
    };
    
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(scriptTag, firstScript);
  };
  
  function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };
  
  function SearchNodeList() {
    this.nodes = [];
    this.quick = (typeof this.nodes.forEach === 'function');
  };
  
  SearchNodeList.prototype.forEach = function(f) {
    if (this.quick) {
      this.nodes.forEach(f);
    } else {
      for (var i = 0, x = this.nodes.length; i < x; i += 1) {
        f(this.nodes[i], i);
      }
    }
    
    return this;
  };
  
  SearchNodeList.prototype.push = function(node) {
    this.nodes.push(node);
    
    return this;
  };
  
  SearchNodeList.prototype.html = function(html) {
    this.forEach(function(e) {
      e.innerHTML = html;
    });
    
    return this;
  };
  
  SearchNodeList.prototype.addClass = function(c) {
    this.forEach(function(e) {
      // Make sure we're not adding the same class twice
      if (e.className.indexOf(c) < 0) {
        // Add a space before it if it's not the first
        if (e.className && e.className.length > 0) {
          c = (' ' + c);
        }
        
        e.className += c;
      }
    });
    
    return this;
  };
  
  SearchNodeList.prototype.removeClass = function(c) {
    // Make sure we get rid of any spaces
    var reg = new RegExp(regExpEscape(c));
    var clean = /\s{2,}/g;
    
    this.forEach(function(e) {
      if (e.className && e.className.length > 0) {
        e.className = e.className.replace(reg, '').replace(clean, ' ').trim();
      }
    });
    
    return this;
  };
  
  function searchNodes(array, c) {
    var r = new SearchNodeList();
    
    var reg = new RegExp(regExpEscape(c));
    for (var i = 0, x = array.length; i < x; i += 1) {
      if (reg.test(array[i].className)) r.push(array[i]);
    }
    
    return r;
  };
  
  var oldOnLoad = window.onload;
  
  function main() {
    // Load the CSS
    var cssLink = document.createElement('link');
    cssLink.setAttribute('rel', 'stylesheet');
    cssLink.setAttribute('type', 'text/css');
    cssLink.setAttribute('href', 'widget/wow-such-widget.css');
    
    (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(cssLink);
    
    // Build the widget HTML
    var divs = document.getElementsByTagName('div');
    var spans = document.getElementsByTagName('span');
    
    searchNodes(divs, 'wow-such-widget').html('<div class="wow-such-widget-overlay"></div><div class="wow-such-widget-lower-bar"></div>');
    
    var fullHTML = false;
    
    function poll() {
      getJSONP(dogeApiUrl, function(data) {
        var ltp = data.ltp;
        
        // Only do this on the first load
        if (!fullHTML) {
          searchNodes(divs, 'wow-such-widget').html('<div class="wow-such-widget-inner">1 DOGE = <span class="wow-such-widget-inner-price"></span> BTC</div><div class="wow-such-widget-credit">Powered by <a href="http://wowsuch.io/?utm_source=' + document.URL + '&utm_medium=widget&utm_campaign=wowsuchwidget" target="_blank">wowsuch.io</a></div><div class="wow-such-widget-lower-bar"></div>');
          fullHTML = true;
        }
        
        // Animate if the price has changed
        var prices = searchNodes(spans, 'wow-such-widget-inner-price');
        if (ltp !== previousValue && previousValue) {
          prices.addClass('wow-such-widget-animate');
          setTimeout(function() {
            prices.removeClass('wow-such-widget-animate');
          }, 2000);
        }
        
        // Fill in the new value
        prices.html(ltp);
        previousValue = ltp;
      });
    }
    
    // Call poll function initially and periodically
    poll();
    setInterval(poll, 10000);
    
    // Do the other window.onload stuff
    if (oldOnLoad) oldOnLoad.apply(this, arguments);
  };
  
  window.onload = main;
})();
