/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    function debounce(func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
    		var later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};
    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    };

    $(document).ready(function(){

        $(".post-content").fitVids();

        // Calculates Reading Time
        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
        });

        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt"))
              $(this).wrap('<figure class="image"></figure>')
              .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });

        var nav = $('.blog-logo');
        var animate = false;

        nav.mouseenter(function() {
            if (animate) nav.animate({ top: "-1px" }, 250);
        });
        nav.mouseleave(function() {
            if (animate) nav.animate({ top: "-90px" }, 250);
        });

        var scrollChecker = debounce(function() {
            if($(window).scrollTop() >= 300){
                nav.css('position', 'fixed');
                nav.css('top', '-90px');
                animate = true;
            } else {
                nav.css('position', 'absolute');
                nav.css('top', '-60px');
                animate = false;
            }
        }, 150);

        window.addEventListener("scroll", scrollChecker);


    });

}(jQuery));