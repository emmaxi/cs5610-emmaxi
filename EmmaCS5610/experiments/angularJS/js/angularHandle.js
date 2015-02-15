var app = angular.module("angularHandle", []);

app.controller("angularHandle", function ($scope) {
      var boston = {
        name: "Boston",
        country: "USA",
        temperature: "27",
        weather: "patchy light snow",
        wind: "7",
        humidity: "86"
    };
    var beijing = {
        name: "Beijing",
        country: "China",
        temperature: "18",
        weather: "Sunny",
        wind: "0",
        humidity: "85"
    };
    var baoji = {
        name: "Baoji",
        country: "China",
        temperature: "33",
        weather: "Sunny",
        wind: "5",
        humidity: "35"
    };
    var los = {
        name: "Los Angeles",
        country: "USA",
        temperature: "84",
        weather: "Sunny",
        wind: "0",
        humidity: "11"
    };
         var cities = [boston, beijing, baoji, los];
         $scope.cities = cities;

            $scope.add = function () {
                var newCity = {
                    name: $scope.name,
                    country: $scope.country,
                    temperature: $scope.temperature,
                    weather: $scope.weather,
                    wind: $scope.wind,
                    humidity: $scope.humidity
                };
                $scope.cities.push(newCity);
            };
            $scope.delete = function (city) {
                var index = $scope.cities.indexOf(city);
                $scope.cities.splice(index,1);
            };

            $scope.deleteAll = function () {
                $scope.cities.splice(0,1000000);
            };
       }
       );