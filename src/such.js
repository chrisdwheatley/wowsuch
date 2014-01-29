// such.js is generated from such.djs

"use strict";

angular.module('wowSuch', []);

angular.module('wowSuch')
    .controller('dogeController', ['$scope', 'dogeData', 'fiatData',
        function($scope, dogeData, fiatData) {

            dogeData.success(function(data) {    

                $scope.singleDogecoinPriceInBTC = data.ltp;

                $scope.amendDogecoinInput = function amendDogecoinInput(numberOfDogecoinInput) {

                    if (numberOfDogecoinInput === "1") {
                        $scope.numberOfBTCInput = $scope.singleDogecoinPriceInBTC;
                    } else {
                        $scope.numberOfBTCInput = numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC;
                    }

                    $scope.numberOfFIATInput = (numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC) * $scope.singleBTCPriceInFIAT;
                    window.localStorage['lastDogeInput'] = numberOfDogecoinInput;

                }

                $scope.amendBTCInput = function amendBTCInput(numberOfBTCInput) {
                    $scope.numberOfDogecoinInput = window.localStorage['lastDogeInput'] = numberOfBTCInput / $scope.singleDogecoinPriceInBTC;
                    $scope.numberOfFIATInput = numberOfBTCInput * $scope.singleBTCPriceInFIAT;
                }

                fiatData.success(function(data) {
                    
                    $scope.selectedCurrencyIndex = undefined;
                    $scope.currencies = [];

                    // Build the currencies array and identify selected index for later
                    var i=0;
                    for (var property in data) {
                      if(!(property == 'ignored_exchanges' || property == 'timestamp')) {
                        $scope.currencies.push({name:property});
                        if(property===window.localStorage['lastFiat']){
                            $scope.selectedCurrencyIndex = i;
                        }
                        i++;
                      }
                    }

                    $scope.selectedCurrency = $scope.currencies[16];
                    
                    $scope.singleBTCPriceInFIAT = data.USD.averages.last;

                    $scope.changeCurrency = function changeCurrency(curr) {
                        $scope.singleBTCPriceInFIAT = data[curr].averages.last;
                        $scope.numberOfFIATInput = data[curr].averages.last * $scope.numberOfBTCInput;
                        window.localStorage['lastFiat'] = $scope.selectedCurrency.name;
                    }

                    $scope.amendFIATInput = function amendFIATInput(numberOfFIATInput) {
                        $scope.numberOfDogecoinInput = window.localStorage['lastDogeInput'] = (numberOfFIATInput / $scope.singleDogecoinPriceInBTC) / $scope.singleBTCPriceInFIAT;
                        $scope.numberOfBTCInput = numberOfFIATInput / $scope.singleBTCPriceInFIAT;
                    }

                    // Check for previous values
                    if(window.localStorage['lastDogeInput'] !== undefined){
                        // Previous fiat currency detected
                        $scope.selectedCurrency = $scope.currencies[$scope.selectedCurrencyIndex];
                    } else {
                        // New user
                        $scope.selectedCurrency = $scope.currencies[16];
                    }
                    if(window.localStorage['lastDogeInput'] !== undefined) {
                        // Previous doge input detected
                        $scope.numberOfDogecoinInput = window.localStorage['lastDogeInput'];
                        $scope.amendDogecoinInput(window.localStorage['lastDogeInput']);
                    } else {
                        // A new user
                        $scope.amendDogecoinInput($scope.numberOfDogecoinInput);
                    }
                });
                // If all fails, use 1
                $scope.numberOfDogecoinInput = 1;

            });
        }
    ]);

angular.module('wowSuch')
    .factory('dogeData', ['$http',
        function($http) {
            var dogeUrl = 'https://lit-beach-8985.herokuapp.com/?callback=soCallback&url=https://www.coins-e.com/api/v2/market/DOGE_BTC/depth&callback=JSON_CALLBACK';
            return $http.jsonp(dogeUrl);
        }
    ]);

angular.module('wowSuch')
    .factory('fiatData', ['$http',
        function($http) {
            var dataUrl = 'https://api.bitcoinaverage.com/all';
            return $http.get(dataUrl);
        }
    ]);

function soCallback(data) {}