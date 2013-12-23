'use strict';

angular.module('wowSuch', []);

angular.module('wowSuch').controller('dogeController', function($scope, dogeData) {
  
  $scope.multiplier = 1;
  
  dogeData.success(function(data) {
    var doge = data.return.markets.DOGE;
    $scope.value = doge.lasttradeprice;
  });
});

angular.module('wowSuch').factory('dogeData', function($http) {
  var dogeUrl = 'http://jsonp.jit.su/?callback=soCallback&url=http%3A%2F%2Fpubapi.cryptsy.com%2Fapi.php%3Fmethod%3Dsinglemarketdata%26marketid%3D132&callback=JSON_CALLBACK';
  return $http.jsonp(dogeUrl);
});

function soCallback(data) {}