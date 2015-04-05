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


    $scope.search = function () {
        var url1 = "https://api.edamam.com/search?q=";
        var keyword = $scope.searchByName;
        var cookbooks = [];
        $scope.cookbooks = cookbooks;
        var url2 = "&app_id=7ae78f96&app_key=62b1961b12d7e4b28ad90b40854bf572&callback=JSON_CALLBACK";
        var targetURL = url1 + keyword + url2;

        $http.jsonp(targetURL)
                .success(function (response) {
                    $scope.cookbooks = response.hits;
                    console.log(targetURL);
                    console.log($scope.cookbooks);
                    //alert($scope.cookbooks[0].recipe.keyIngredients[0].uri);
                    //alert($scope.cookbooks[0].recipe.image);
                });
    }

});