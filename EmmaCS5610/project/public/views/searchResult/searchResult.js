app.controller("apiController", function ($scope, $http, $rootScope, $location) {


    $scope.favoriteRecipes = [];

    $scope.detailsRecipe = function (cookbook) {

        var strs = new Array();
        strs = cookbook.recipe.uri.split("_");
        var recipeId = strs[1];
        $location.url("/recipeDetails/" + recipeId);
//        window.open("/#/recipeDetails/" + recipeId);
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


    $scope.addLike = function (cookbook) {
        if (typeof ($rootScope.currentUser) == "undefined") {
            $location.url('/login');
        } else {
            var likeUId = $rootScope.currentUser._id;
            $http.post('/like/' + likeUId, cookbook)
                    .success(function (likes) {
                        $scope.likes = likes;
                        alert("Successfully liked!");
                        console.log($scope.likes);
                    });
        }
    }

});