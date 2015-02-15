var app = angular.module("angularAPI", []);

app.controller("apiController", function ($scope,$http) {
      var boston = {
        location: "Boston,USA",
        temperature: "27",
        weather: "patchy light snow",
        wind: "7",
        humidity: "86"
    };
    var beijing = {
        location: "Beijing,China",
        temperature: "18",
        weather: "Sunny",
        wind: "0",
        humidity: "85"
    };
    var baoji = {
        location: "Baoji,China",
        temperature: "33",
        weather: "Sunny",
        wind: "5",
        humidity: "35"
    };
    var los = {
        location: "Los Angeles,USA",
        temperature: "84",
        weather: "Sunny",
        wind: "0",
        humidity: "11"
    };
         var cities = [boston, beijing, baoji, los];
         $scope.cities = cities;

            
            $scope.delete = function (city) {
                var index = $scope.cities.indexOf(city);
                $scope.cities.splice(index,1);
            };

            $scope.deleteAll = function () {
                $scope.cities.splice(0,1000000);
            };


            $scope.search = function () {
                        var url1 = "http://api.worldweatheronline.com/free/v1/weather.ashx?q="
                        var city = $scope.searchByName
                        var url2 = "&format=json&num_of_days=5&key=c325dbdb319be47d1411a23e18dea75806db50e6"
                        var targetURL = url1 + city + url2
                        
                        $http.get(targetURL).success( function (data) {
                        
                                $scope.cities.push({
                                    location: data.data.request[0].query,
                                    temperature: data.data.current_condition[0].temp_F,
                                    weather: data.data.current_condition[0].weatherDesc[0].value,
                                    humidity: data.data.current_condition[0].humidity,
                                    wind: data.data.current_condition[0].windspeedMiles
                                });
                            });
                    };


    });