var app = angular.module("DeveloperApp", []);

app.factory("CityService", function($http) {
   var create = function(city,callback)
   {
     $http.post("/city",city)
        .success(callback);
   }
   
   
   var findAll = function(callback) {
        $http.get("/city")
        .success(callback);
   }

   var remove = function(id, callback){
      $http.delete("/city/"+ id)
      .success(callback);
   }

   var update = function(id,city, callback){
     $http.put("/city/"+ id, city)
       .success(callback);
   }

   return{
     create: create,
     findAll: findAll,
     remove: remove ,
     update: update
   }
});

app.controller("DeveloperController", function ($scope, $http,CityService) {
    $http.get("/city")
    .success(function (response) {
        $scope.cities = response;
    });


    $scope.selectedIndex = null;
    /*$scope.select = function(index){
        $scope.selectedIndex = index;
        $scope.city = $scope.cities[index];
    }*/

    $scope.select = function(index){
        $scope.selectedIndex = index;
        $scope.selectedCity = $scope.cities[index];
    }
    

    $scope.remove = function (id) { 
      CityService.remove(id, function(response) {
         $scope.cities = response;
         CityService.findAll(function (response) {
        $scope.cities = response;
        });
    });
   }

    CityService.findAll(function (response) {
        $scope.cities = response;
    });

    $scope.removeEvent = function(eventIndex)
    {
      $scope.selectedCity.events.splice(eventIndex,1);
     CityService.update($scope.selectedCity._id, $scope.selectedCity,function(response){
          $scope.cities = response;
        });
    }

    $scope.addEvent = function(event)
    {
        if (typeof $scope.selectedCity.events == "undefined")
        {
            $scope.selectedCity.events = [];
        }
        var newEvent = {
            name: event.name
        }
        $scope.selectedCity.events.push(newEvent);
         CityService.update($scope.selectedCity._id, $scope.selectedCity,function(response){
          $scope.cities = response;
        });
    }

    $scope.add = function (city) {
          CityService.create(city,function (response) {
            $scope.cities = response;
        });
        CityService.findAll(function (response) {
        $scope.cities = response;
    });
    }

    /*$scope.update = function(city) {
      $http.put("/city/"+ $scope.selectedIndex,city)
      .success(function (response) {
        $scope.cities = response;
      });
    };*/

    $scope.update = function(city) {
      
      CityService.update(city._id,city,function (response) {
        $scope.cities = response;
      });
    }

});