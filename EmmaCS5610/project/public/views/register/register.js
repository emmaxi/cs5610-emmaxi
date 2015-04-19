app.controller("RegisterCtrl", function ($scope, $http, $location, $rootScope) {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    $scope.register = function (user) {
        console.log(user);
        if (user.password != user.password2 || !user.password || !user.password2) {
            alert("Your passwords don't match");
            $rootScope.message = "Your passwords don't match";
            user.password = "";
            user.password2 = "";
        }
        else {
            if (user.username == null) {
                alert("Username can not be empty");
            } else {
                if (!reg.test(user.email)) {
                    alert("Please input the valid email!");
                    user.email = "";
                } else {
                    $http.post("/register", user)
                    .success(function (response) {
                        console.log(response);
                        if (response != null) {
                            $rootScope.currentUser = response;
                            $location.url("/profile");
                        }
                    });
                }

            }
        }
    }
});


