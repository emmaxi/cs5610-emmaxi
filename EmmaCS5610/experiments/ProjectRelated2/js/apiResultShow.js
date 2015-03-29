var app = angular.module("api", []);

app.controller("apiController", function ($scope, $http) {

    $scope.search = function () {
        var url1 = "https://api.edamam.com/search?q=";
        var keyword = $scope.searchByName;
        var recipes = [];
        $scope.recipes = recipes;
        var url2 = "&app_id=7ae78f96&app_key=62b1961b12d7e4b28ad90b40854bf572";
        var targetURL = url1 + keyword + url2;

        $.ajax({
            dataType: 'jsonp',
            url: targetURL,
            success: function (response) {
                /*console.log(response);
                $scope.recipes = response.hits;
                console.log($scope.recipes);
                console.log(response.hits[0].recipe.image);*/
                console.log(response);

                $scope.recipes = response.hits;
    
                alert("got data!"+ $scope.recipes);
            }
        })
    }






});