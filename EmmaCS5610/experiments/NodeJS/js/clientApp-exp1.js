var app = angular.module("DeveloperApp", []);
app.controller("DeveloperController", function ($scope, $http) {
    $http.get("/city")
    .success(function (response) {
        $scope.cities = response;
    });


    $scope.selectedIndex = null;
    $scope.select = function(index){
        $scope.selectedIndex = index;
        $scope.city = $scope.cities[index];
    }

    $scope.remove = function (index) { 
      $http.delete("/city/"+ index)
      .success(function(response){
         $scope.cities = response;
      });
    };

    $scope.add = function (city) {
          $http.post("/city",city)
        .success(function (response) {
            $scope.cities = response;
        });
    };

    $scope.update = function(city) {
      $http.put("/city/"+ $scope.selectedIndex,city)
      .success(function (response) {
        $scope.cities = response;
      });
    };

});