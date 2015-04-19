app.controller('ProfileCtrl', function ($scope, $http, $rootScope) {

    $http.get("/rest/user")
    .success(function (users) {
        $scope.users = users;
    });

    $http.get("/follow/"+$rootScope.currentUser._id)
    .success(function (follows) {
        $scope.follows = follows;
    });

    $http.get("/like/"+ $rootScope.currentUser._id)
    .success(function (likes) {
        $scope.likes = likes;
    });

    $http.get("/review/"+ $rootScope.currentUser._id)
    .success(function (reviews) {
        $scope.reviews = reviews;
    });


    //    $scope.remove = function(user)
    //    {
    //        $http.delete('/rest/user/'+user._id)
    //        .success(function(users){
    //           $scope.users = users; 
    //        });
    //    }

    $scope.updateUser = function (user) {
        $http.put('/rest/user/' + user._id, user)
        .success(function (users) {
            $scope.users = users;
        });
    }

    //    $scope.add = function(user)
    //    {
    //        $http.post('/rest/user', user)
    //        .success(function(users){
    //            $scope.users = users; 
    //        });
    //    }
    //    
    //    $scope.select = function(user)
    //    {
    //        $scope.user = user;
    //    }



    $scope.addFollow = function (follower, befollowed) {
        $http.post('/follow/' + follower._id, befollowed)
        .success(function (follows) {
            $scope.follows = follows;
            console.log($scope.follows);
        });
    }

    $scope.follow = function (user) {
        if (user.username == $rootScope.currentUser.username) {
            alert("You can not follow yourself!");
        } else {
            $scope.addFollow($rootScope.currentUser, user);
        }
    }

    $scope.removeFollow = function (follow) { 
        $http.delete('follow/'+ follow._id, $rootScope.currentUser)
        .success(function (follows) {
            $scope.follows = follows;
            console.log($scope.follows);
        });
    }

     $scope.removeLike = function (like) { 
        $http.delete('like/'+ like._id)
        .success(function (likes) {
            $scope.likes = likes;
            console.log($scope.likes);
        });
    }

});