var app = angular.module("detail", []);

app.controller("detailCtrl", function ($scope, $http) {

    var recipeId = location.href.split('id=').pop();

    $http.jsonp("https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_" + recipeId + "&callback=JSON_CALLBACK")
        .success(function (cookbook) {
            console.log(cookbook);
            $scope.details = cookbook;

        });
});