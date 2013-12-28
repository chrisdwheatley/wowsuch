// such.js is generated from such.djs 

"use strict";

angular.module('wowSuch', []);

angular.module('wowSuch')
    .controller('dogeController', ['$scope', 'dogeData', 'donationData',
        function($scope, dogeData, donationData) {
            $scope.multiplier = 1;
            dogeData.success(function(data) {
                var doge = data.
                return .markets.DOGE;
                $scope.value = doge.lasttradeprice;
            })
            donationData.success(function(data) {
                $scope.donations = data.donations;
            });
        }
    ]);

angular.module('wowSuch')
    .factory('dogeData', ['$http',
        function($http) {
            var dogeUrl = 'https://jsonp.nodejitsu.com/?callback=soCallback&url=http%3A%2F%2Fpubapi.cryptsy.com%2Fapi.php%3Fmethod%3Dsinglemarketdata%26marketid%3D132&callback=JSON_CALLBACK';
            return $http.jsonp(dogeUrl);
        }
    ]);

angular.module('wowSuch')
    .factory('donationData', ['$http',
        function($http) {
            return $http.get('donations.json');;
        }
    ]);

function soCallback(data) {}