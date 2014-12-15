/**************************************
* Zebra Striping Plugin               *
* A pluging that zebra sripes a table *
*                                     *
* @author Fabio Trabucchi             *
**************************************/
"use strict";
;(function($) {

  var MutationObserver = window["MutationObserver"] || window["WebKitMutationObserver"] || window["MozMutationObserver"];

  /* @param options: Options for the zebra striping */
  $.fn.zebraStripe = function(options) {
    var settings = $.extend({}, $.fn.zebraStripe.defaults, options);

    function stripe(element) {
      $(element).find(settings.selector).each(function(index) {
        $(this).removeClass(settings.classes[(index+1) % 2]).addClass(settings.classes[index % 2]);
      });
    }

    stripe(this);

    settings.observer && this.each(function(index, element) {
      $(this).find(settings.observer.selector).each(function() {
        new MutationObserver(function(mutations) {
          !$(mutations[0].target).is(':animated') && stripe(element);
        }).observe(this, {attributes: true, attributeFilter: ["class", "style"]});
      });
    });

		return this;
  };


  $.fn.zebraStripe.defaults = {
  	selector: "tbody tr:visible:not(.no-zebra)",
  	classes: ["odd", "even"],
  	observer: {selector: "tbody tr"}
  };

})(jQuery);
