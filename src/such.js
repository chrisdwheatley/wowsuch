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
                    window.localStorage['lastAmended'] = 'doge';
                    window.localStorage['lastQuantity'] = numberOfDogecoinInput;

                }

                $scope.amendBTCInput = function amendBTCInput(numberOfBTCInput) {
                    $scope.numberOfDogecoinInput = numberOfBTCInput / $scope.singleDogecoinPriceInBTC;
                    $scope.numberOfFIATInput = numberOfBTCInput * $scope.singleBTCPriceInFIAT;
                    window.localStorage['lastAmended'] = 'btc';
                    window.localStorage['lastQuantity'] = numberOfBTCInput;
                }

                fiatData.success(function(data) {
                    $scope.selectedCurrencyIndex = undefined;
                    $scope.currencies = [];

                    // Build the currencies array and identify selected index for later
                    var i=0;
                    for (var property in data) {
                      if(!(property == 'ignored_exchanges' || property == 'timestamp')) {
                        $scope.currencies.push({name:property});
                        if(property===window.localStorage['lastAmended']){
                            $scope.selectedCurrencyIndex = i;
                        }
                        i++;
                      }
                    }
                    

                    $scope.singleBTCPriceInFIAT = data.USD.averages.last;

                    $scope.changeCurrency = function changeCurrency(curr) {
                        $scope.singleBTCPriceInFIAT = data[curr].averages.last;
                        $scope.numberOfFIATInput = data[curr].averages.last * $scope.numberOfBTCInput;
                        window.localStorage['lastAmended'] = $scope.selectedCurrency.name;

                        window.localStorage['lastQuantity'] = $scope.numberOfFIATInput;
                    }

                    $scope.amendFIATInput = function amendFIATInput(numberOfFIATInput) {
                        $scope.numberOfDogecoinInput = (numberOfFIATInput / $scope.singleDogecoinPriceInBTC) / $scope.singleBTCPriceInFIAT;
                        $scope.numberOfBTCInput = numberOfFIATInput / $scope.singleBTCPriceInFIAT;
                        window.localStorage['lastAmended'] = $scope.selectedCurrency.name;
                        window.localStorage['lastQuantity'] = numberOfFIATInput;
                    }

                    // Load settings if Fiat is selected
                    if(window.localStorage['lastAmended'] !== 'doge' && window.localStorage['lastAmended'] !== 'btc' && window.localStorage['lastAmended'] !== undefined) {
                        $scope.selectedCurrency = $scope.currencies[$scope.selectedCurrencyIndex];
                        $scope.numberOfFIATInput = window.localStorage['lastQuantity'];
                        $scope.amendFIATInput(window.localStorage['lastQuantity']);
                    } else { // We don't do much here, look to below loop for more
                        $scope.selectedCurrency = $scope.currencies[16];
                        $scope.numberOfFIATInput = data.USD.averages.last * $scope.numberOfBTCInput;
                    }
                });

                if(window.localStorage['lastAmended'] === 'doge') {
                    // DOGE
                    $scope.numberOfDogecoinInput = window.localStorage['lastQuantity'];
                    $scope.amendDogecoinInput(window.localStorage['lastQuantity']);
                } else if(window.localStorage['lastAmended'] === 'btc') {
                    // BTC
                    $scope.numberOfBTCInput = window.localStorage['lastQuantity'];
                    $scope.amendBTCInput(window.localStorage['lastQuantity']);
                } else if(window.localStorage['lastAmended'] === undefined) {
                    // New user
                    $scope.numberOfDogecoinInput = 1 ;
                } else {
                    // Assume Fiat
                    // Do nothing in this loop, check above loop intead
                }

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