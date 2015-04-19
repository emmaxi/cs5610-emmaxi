//var app = angular.module("detail", []);

app.controller("detailCtrl", function ($scope, $http, $routeParams, $location, $rootScope) {
    var recipeId = $routeParams.id;
    //var eReviews= {[reviewUId:"adfasfa"]};
    $http.get("/review/other/" + recipeId)
      .success(function (reviews) {
          console.log(reviews);
          $scope.eReviews = reviews;

      });

    $http.jsonp("https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_" + recipeId + "&callback=JSON_CALLBACK")
        .success(function (cookbook) {
            console.log(cookbook);
            $scope.recipe = cookbook;
            $scope.ingredients = cookbook[0].ingredients;
            $scope.healthLabels = cookbook[0].healthLabels;
            $rootScope.currentRecipe = cookbook;
        });


    //    $scope.addLike = function (recipe) {
    //        if (typeof ($rootScope.currentUser) == "undefined") {
    //            $location.url('/login');
    //        } else {
    //            var likeU = $rootScope.currentUser._id;
    //            $http.post('/like/' + likeU, recipe)
    //            .success(function (likes) {
    //                $scope.likes = likes;
    //                console.log($scope.likes);
    //            });
    //        }
    //    }

    $scope.addReview = function () {
        if (typeof ($rootScope.currentUser) == "undefined") {
            $location.url('/login');
        } else {
            var comment = $scope.reviewComment;
            var reviewUId = $rootScope.currentUser._id;
            var currentRecipe = $rootScope.currentRecipe;

            $http.post('/review/' + reviewUId, { recipeId: recipeId, comment: comment, currentRecipe: currentRecipe })
                .success(function (reviews) {
                    $scope.reviews = reviews;
                    console.log($scope.reviews);
                     $location.url("/profile");
                });
        }
    }


});

