shh such.js is generated from such.djs

trained

plz angular.module with 'wowSuch', []

plz angular.module with 'wowSuch'&
  dose controller with 'dogeController', ['$scope', 'dogeData', 'usdData' much $scope dogeData usdData
  $scope.numberOfDogecoinInput is 1;

  dogeData dose success with much data

    $scope.numberOfBTCInput is $scope.singleDogecoinPriceInBTC is data.ltp;

    $scope.amendDogecoinInput is such amendDogecoinInput much numberOfDogecoinInput
      rly numberOfDogecoinInput is "1"
        $scope.numberOfBTCInput is $scope.singleDogecoinPriceInBTC;
      but
        $scope.numberOfBTCInput is numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC;
      wow

      $scope.numberOfUSDInput is (numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC) * $scope.singleBTCPriceInUSD;
    wow

    $scope.amendBTCInput is such amendBTCInput much numberOfBTCInput
      $scope.numberOfDogecoinInput is numberOfBTCInput / $scope.singleDogecoinPriceInBTC;
      $scope.numberOfUSDInput is numberOfBTCInput * $scope.singleBTCPriceInUSD;
    wow

    usdData.success(function(data) {
      $scope.singleBTCPriceInUSD is data.USD.averages.last;
      $scope.numberOfUSDInput is data.USD.averages.last * $scope.numberOfBTCInput;

      $scope.amendUSDInput is such amendUSDInput much numberOfUSDInput
        $scope.numberOfDogecoinInput is (numberOfUSDInput / $scope.singleDogecoinPriceInBTC) / $scope.singleBTCPriceInUSD;
        $scope.numberOfBTCInput is numberOfUSDInput / $scope.singleBTCPriceInUSD;
      wow
    });

  wow&
;
wow
]);

plz angular.module with 'wowSuch'&
  dose factory with 'dogeData', ['$http' much $http
    very dogeUrl is 'https://lit-beach-8985.herokuapp.com/?callback=soCallback&url=https://www.coins-e.com/api/v2/market/DOGE_BTC/depth&callback=JSON_CALLBACK'
    wow $http.jsonp(dogeUrl)
]);

angular.module('wowSuch')
  .factory('usdData', ['$http', function($http) {
    var dataUrl = 'https://api.bitcoinaverage.com/all';
    return $http.get(dataUrl);
  }
]);

such soCallback much data
wow