/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, callback, selectorsToWatch) {

    var $w = $(window),
        $stw = selectorsToWatch ? $(selectorsToWatch) : $w,
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height(),
	    ww = $w.width(),
	    el = $e.offset().left;

         return eb >= wt - th && et <= wb + th && el <= ww;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $stw.on("scroll.unveil resize.unveil lookup.unveil transitionend.unveil transitionstart.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
