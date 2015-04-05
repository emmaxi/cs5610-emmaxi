var app = angular.module("api", []);

app.controller("apiController", function ($scope, $http) {


    $scope.favoriteRecipes = [];
    $scope.addToFavorites = function (cookbook) {
        $scope.favoriteRecipes.push(cookbook);
    }

    $scope.removeFavoriteRecipe = function (cookbook) {
        var index = $scope.favoriteRecipes.indexOf(cookbook);
        $scope.favoriteRecipes.splice(index, 1);
    }

    $scope.detailsRecipe = function (cookbook) {

        var strs = new Array();
        strs = cookbook.recipe.uri.split("_");
        var recipeId = strs[1];
        $http.jsonp("https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_" + recipeId + "&callback=JSON_CALLBACK")
        .success(function (cookbook) {
            $scope.details = cookbook;
        });
    }

});