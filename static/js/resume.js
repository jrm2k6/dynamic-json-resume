$(document).ready(function() {
    var extraElement = $("#extra");
    var cvElement = $("#cv");
    var cvDivHeight = $("#cv").height();
    
    increaseHeightCvDiv(cvElement, cvDivHeight);

    $(window).on("scroll", function(e) {
        if ($(window).width() < "900") {
            showExtraDivAtBottom();
        } else {
            resetStyles();
        }
    });

    $(window).on("resize", function(e) {
        if ($(window).width() < "900") {
            showExtraDivAtBottom();
        } else {
            resetStyles();
        }
    });

    var showExtraDivAtBottom = function() {
        var viewportHeight = $(window).height();
        var _height = viewportHeight / 4;
        extraElement.height(_height);
        var positionTopExtraElement = viewportHeight - _height;
        extraElement.css({'position': 'fixed', 
                      'top': positionTopExtraElement + 'px',
                      'width': '100%'
                     });

    };

    var resetStyles = function() {
        extraElement.css('height', '');
        extraElement.css('width', '');
        extraElement.css('position', '');
        extraElement.css('top', '');
    };
});

var increaseHeightCvDiv = function(cvElement, cvDivHeight) {
    cvElement.height(cvDivHeight + $(window).height() * 2);
};