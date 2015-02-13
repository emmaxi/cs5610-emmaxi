function arrayController($scope) {
    var boston = {
        city: "Boston",
        country: "USA",
        temperature: "27",
        weather: "patchy light snow",
        wind: "7",
        humidity: "86"
    };
    var beijing = {
        city: "Beijing",
        country: "China",
        temperature: "18",
        weather: "Sunny",
        wind: "0",
        humidity: "85"
    };
    var baoji = {
        city: "Baoji",
        country: "China",
        temperature: "33",
        weather: "Sunny",
        wind: "5",
        humidity: "35"
    };
    var los = {
        city: "Los Angeles",
        country: "USA",
        temperature: "84",
        weather: "Sunny",
        wind: "0",
        humidity: "11"
    };
    var cities = [boston, beijing, baoji, los];
    $scope.cities = cities;
}
