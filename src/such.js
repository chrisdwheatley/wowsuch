"use strict";

// angular initialisation
angular.module('wowSuch', []);

// application controller
angular.module('wowSuch').controller('dogeController', ['$scope','dogeData','fiatData', function ($scope, dogeData, fiatData) {

  // upon receiving a successful dogeData request
  dogeData.success(function(data) {
    $scope.singleDogecoinPriceInBTC = data.ltp;

    // when the user amends the dogecoin input
    $scope.amendDogecoinInput = function amendDogecoinInput(numberOfDogecoinInput) {
      $scope.numberOfBTCInput = numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC;
      $scope.numberOfFIATInput = (numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC) * $scope.singleBTCPriceInFIAT;
      window.localStorage['lastDogeInput'] = numberOfDogecoinInput;
    }

    // when the user amends the bitcoin input
    $scope.amendBTCInput = function amendBTCInput(numberOfBTCInput) {
      $scope.numberOfDogecoinInput = window.localStorage['lastDogeInput'] = numberOfBTCInput / $scope.singleDogecoinPriceInBTC;
      $scope.numberOfFIATInput = numberOfBTCInput * $scope.singleBTCPriceInFIAT;
    }

    // upon receiving a successful fiatData request
    fiatData.success(function(data) {
      var i=0;
      $scope.singleBTCPriceInFIAT = data.USD.averages.last;
      $scope.currencies = [];
      $scope.selectedCurrencyIndex = undefined;

      // Build the currencies array and identify selected index for later
      // ignore a couple of the non currency values returned from the API
      for (var property in data) {
        if(!(property == 'ignored_exchanges' || property == 'timestamp')) {
          $scope.currencies.push({name:property});
          if(property===window.localStorage['lastFiat']){
            $scope.selectedCurrencyIndex = i;
          }
        i++;
        }
      }

      // when the user amends the FIAT currency
      $scope.changeCurrency = function changeCurrency(curr) {
        $scope.singleBTCPriceInFIAT = data[curr].averages.last;
        $scope.numberOfFIATInput = data[curr].averages.last * $scope.numberOfBTCInput;
        window.localStorage['lastFiat'] = $scope.selectedCurrency.name;
      }

      // when the user amends the FIAT input amount
      $scope.amendFIATInput = function amendFIATInput(numberOfFIATInput) {
        $scope.numberOfDogecoinInput = window.localStorage['lastDogeInput'] = (numberOfFIATInput / $scope.singleDogecoinPriceInBTC) / $scope.singleBTCPriceInFIAT;
        $scope.numberOfBTCInput = numberOfFIATInput / $scope.singleBTCPriceInFIAT;
      }

      // Check for previous entered FIAT currency from local storage
      if(window.localStorage['lastFiat'] !== undefined) {
        $scope.selectedCurrency = $scope.currencies[$scope.selectedCurrencyIndex];
      } else {
        // New user, default to USD
        $scope.numberOfDogecoinInput = 1;
        $scope.selectedCurrency = $scope.currencies[18];
      }

       // Check for previous entered dogecoin amount from local storage
      if(window.localStorage['lastDogeInput'] !== undefined) {
        $scope.numberOfDogecoinInput = window.localStorage['lastDogeInput'];
        $scope.amendDogecoinInput(window.localStorage['lastDogeInput']);
      } else {
        // A new user
        $scope.amendDogecoinInput($scope.numberOfDogecoinInput);
      }
    }).error(function() {
      // If all fails, use 1
      $scope.numberOfDogecoinInput = 1;
    });
  });

}]);

// retrieve dogecoin to bitcoin price
angular.module('wowSuch').factory('dogeData', ['$http', function($http) {
  var dogeUrl = 'https://lit-beach-8985.herokuapp.com/?callback=soCallback&url=https://www.coins-e.com/api/v2/market/DOGE_BTC/depth&callback=JSON_CALLBACK';
  return $http.jsonp(dogeUrl);
}]);

// retrieve bitcoin to FIAT price
angular.module('wowSuch').factory('fiatData', ['$http', function($http) {
  var dataUrl = 'https://api.bitcoinaverage.com/all';
  return $http.get(dataUrl);
}]);

// callback function
function soCallback(data) {}