$(document).ready(function () {
    var videoDiv = $('.embed-responsive');
    videoDiv.hide();
    var progressBar = $('.progress .progress-bar');
    var widthNum = 0;
    var aria_valuenow = 0;
    var interval = setInterval(function () {
        widthNum += 10;
        aria_valuenow += 10;
        if (widthNum > 100) {
            clearInterval(interval);
            alert("Finished loading!")
            videoDiv.show();
        }
        var width = widthNum + '%';
        progressBar.css('width', width);
        progressBar.attr("aria-valuenow", aria_valuenow);
    }, 500);
});