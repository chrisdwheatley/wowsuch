// such.js is generated from such.djs 

"use strict";

angular.module('wowSuch', []);

angular.module('wowSuch')
    .controller('dogeController', ['$scope', 'dogeData', 'usdData',
        function($scope, dogeData, usdData) {
            $scope.numberOfDogecoinInput = 1;

            dogeData.success(function(data) {

                $scope.numberOfBTCInput = $scope.singleDogecoinPriceInBTC = data.ltp;

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
                    $scope.singleBTCPriceInUSD = data.USD.averages.last;
                    $scope.numberOfUSDInput = data.USD.averages.last * $scope.numberOfBTCInput;

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
            var dogeUrl = 'https://lit-beach-8985.herokuapp.com/?callback=soCallback&url=https://www.coins-e.com/api/v2/market/DOGE_BTC/depth&callback=JSON_CALLBACK';
            return $http.jsonp(dogeUrl);
        }
    ]);

angular.module('wowSuch')
    .factory('usdData', ['$http',
        function($http) {
            var dataUrl = 'https://api.bitcoinaverage.com/all';
            return $http.get(dataUrl);
        }
    ]);

function soCallback(data) {}