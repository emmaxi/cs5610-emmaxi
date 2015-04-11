var app = angular.module("DeveloperApp", []);
app.controller("DeveloperController", function ($scope, $http) {
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
        humidity: "3500"
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


    $scope.add = function (city) {
        cities.push(city);
    };

    $scope.update = function (city) {
        $http.put("/city/" + $scope.selectedIndex, city)
      .success(function (response) {
          $scope.cities = response;
      });
    };

});