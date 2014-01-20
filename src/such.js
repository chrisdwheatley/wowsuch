// such.js is generated from such.djs

"use strict";

angular.module('wowSuch', []);

angular.module('wowSuch')
    .controller('dogeController', ['$scope', 'dogeData', 'usdData',
        function($scope, dogeData, usdData) {
            $scope.numberOfDogecoinInput = 1;

            dogeData.success(function(data) {

                console.log(data);

                $scope.numberOfBTCInput = $scope.singleDogecoinPriceInBTC = data.btc;

                $scope.amendDogecoinInput = function amendDogecoinInput(numberOfDogecoinInput) {
                    if (numberOfDogecoinInput === "1") {
                        $scope.numberOfBTCInput = $scope.singleDogecoinPriceInBTC;
                    } else {
                        $scope.numberOfBTCInput = numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC;
                    }

                    $scope.numberOfUSDInput = (numberOfDogecoinInput * $scope.singleDogecoinPriceInBTC) * $scope.singleBTCPriceInUSD;
                }

                $scope.amendBTCInput = function amendBTCInput(numberOfBTCInput) {
                    $scope.numberOfDogecoinInput = numberOfBTCInput / $scope.singleDogecoinPriceInBTC;
                    $scope.numberOfUSDInput = numberOfBTCInput * $scope.singleBTCPriceInUSD;
                }

                usdData.success(function(data) {
                    $scope.singleBTCPriceInUSD = data.
                    return .buy.value;
                    $scope.numberOfUSDInput = data.
                    return .buy.value * $scope.numberOfBTCInput;

                    $scope.amendUSDInput = function amendUSDInput(numberOfUSDInput) {
                        $scope.numberOfDogecoinInput = (numberOfUSDInput / $scope.singleDogecoinPriceInBTC) / $scope.singleBTCPriceInUSD;
                        $scope.numberOfBTCInput = numberOfUSDInput / $scope.singleBTCPriceInUSD;
                    }
                });

            });
        }
    ]);

angular.module('wowSuch')
    .factory('dogeData', ['$http',
        function($http) {
            var dogeUrl = 'api/doge.json';
            return $http.get(dogeUrl);
        }
    ]);

angular.module('wowSuch')
    .factory('usdData', ['$http',
        function($http) {
            var dataUrl = 'https://lit-beach-8985.herokuapp.com/?callback=soCallback&url=http://data.mtgox.com/api/1/BTCUSD/ticker_fast&callback=JSON_CALLBACK';
            return $http.jsonp(dataUrl);
        }
    ]);

function soCallback(data) {}