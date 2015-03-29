var app = angular.module("api", []);
 
app.controller("apiController", function ($scope, $http) {

     var recipeEgg = {
        label: "Eggs On Eggs: Soft Egg And Fish Roe Toast Recipe",
        calories: 3009.9865808,
        level: "MODERATE",
        cookingTime: 20,
        keyIngredients: [{label:"Fish, roe, mixed species, raw"},{label:"Bread, wheat"},{label:"Butter, without salt"},{label:"Egg, whole, raw, fresh"}],
        imageURL: "https://www.edamam.com/web-img/57b/57be310d2c133270989181e67851b1d1.png"
    };
    var recipeNoodle = {
        label: "Peanut Noodle Salad",
        calories: 1717.841,
        level: "EASY",
        cookingTime: 10,
        keyIngredients: [{label:"Cucumber, with peel, raw"},{label:"Peppers, sweet, red, raw"},{label:"Noodles, egg, dry, enriched"}],
        imageURL: "https://www.edamam.com/web-img/a07/a07632e9a78930f50492e55bcc146749.jpg"
    };
    
    var recipes = [recipeEgg, recipeNoodle];
    $scope.recipes = recipes;
});