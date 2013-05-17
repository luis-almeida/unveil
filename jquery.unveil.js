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

  $.fn.unveil = function(threshold, target) {

    var $w = target ? $(target) : $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded,
        inview,
        source;

    this.one("unveil", function() {
      source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) this.setAttribute("src", source);
    });

    function unveil() {
      inview = images.filter(function() {
        var $e = $(this),
            wo = $w.offset() ? $w.offset().top : 0,
            wlo = $w.offset() ? $w.offset().left : 0,
            wt = $w.scrollTop() + wo,
            wlt = $w.scrollLeft() + wlo,
            wb = wt + $w.height(),
            wlb = wlt + $w.width(),
            et = $e.offset().top,
            el = $e.offset().left,
            eb = et + $e.height(),
            elb = el + $e.width();

        return eb >= wt - th && et <= wb + th && elb >= wlt - th && el <= wlb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.scroll(unveil);
    $w.resize(unveil);

    unveil();

    return this;

  };

})(jQuery);


