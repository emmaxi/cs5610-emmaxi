$(document).ready(function () {
    $('.choose').change(function () {
          readURL(this);
           });

           function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('.preview').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
        });

    
    
    
    var app = angular.module("imageAngular",[]);
        app.controller("itemController", function ($scope) {
            $scope.items = [];

            $scope.addItem = function () {
                var currentItems = $scope.items;
                var srcToAdd = $('.preview').attr("src");

                if (srcToAdd.length < 1) {
                    alert("Please choose an image first.");
                } else {
                        $scope.items.push({ src: $('.preview').attr("src"), designer: $scope.designer_name });
                        $('.preview').attr("src", "");
                        $scope.designer_name = "";
                }
            };

            $scope.clearItems = function () {
                $scope.items = [];
                $('.preview').attr("src", "");
            };
    });
