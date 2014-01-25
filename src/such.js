// such.js is generated from such.djs

"use strict";

angular.module('wowSuch', []);

angular.module('wowSuch')
    .controller('dogeController', ['$scope', 'dogeData', 'fiatData',
        function($scope, dogeData, fiatData) {
            $scope.numberOfDogecoinInput = 1;

            dogeData.success(function(data) {

                $scope.numberOfBTCInput = $scope.singleDogecoinPriceInBTC = data.ltp;

                $scope.amendDogecoinInput = function amendDogecoinInput(numberOfDogecoinInput) {
                    if (numberOfDogecoinInput === "1") {
                        $scope.numberOfBTCInput = $scope.singleDogecoinPriceInBTC;
                    } else {
                        $scope.numberOfBTCInput = numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC;
                    }

                    $scope.numberOfFIATInput = (numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC) * $scope.singleBTCPriceInFIAT;
                }

                $scope.amendBTCInput = function amendBTCInput(numberOfBTCInput) {
                    $scope.numberOfDogecoinInput = numberOfBTCInput / $scope.singleDogecoinPriceInBTC;
                    $scope.numberOfFIATInput = numberOfBTCInput * $scope.singleBTCPriceInFIAT;
                }

                fiatData.success(function(data) {

                    $scope.currencies = [];
                    for (var property in data) {
                      if(!(property == 'ignored_exchanges' || property == 'timestamp')) {
                        $scope.currencies.push({name:property});
                      }
                    }

                    $scope.selectedCurrency = $scope.currencies[16];

                    $scope.singleBTCPriceInFIAT = data.USD.averages.last;
                    $scope.numberOfFIATInput = data.USD.averages.last * $scope.numberOfBTCInput;

                    $scope.changeCurrency = function changeCurrency(curr) {
                        $scope.singleBTCPriceInFIAT = data[curr].averages.last;
                        $scope.numberOfFIATInput = data[curr].averages.last * $scope.numberOfBTCInput;
                    }

                    $scope.amendFIATInput = function amendFIATInput(numberOfFIATInput) {
                        $scope.numberOfDogecoinInput = (numberOfFIATInput / $scope.singleDogecoinPriceInBTC) / $scope.singleBTCPriceInFIAT;
                        $scope.numberOfBTCInput = numberOfFIATInput / $scope.singleBTCPriceInFIAT;
                    }
                });

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