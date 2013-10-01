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

  $.fn.unveil = function(options, callback) {

    var $w = $(window),
        defaults = {
          threshold: 0,
          throttle: 0
        };

    options = $.extend(defaults, options);

    var $w = $(window),
        retina = window.devicePixelRatio > 1,
        attrib = retina ? "data-src-retina" : "data-src",
        images = this,
        loaded,
        timer,
        wh, 
        eh;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function onResize() {
      wh = $w.height();
      unveil();
    }

    function filterImages() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        if (!wh) {
          wh = $w.height();
        }

        var wt = $w.scrollTop(),
            wb = wt + wh,
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - options.threshold && et <= wb + options.threshold;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    function unveil() {
      if (options.throttle) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            filterImages();
          }, options.throttle);
      } else {
        filterImages();
      }
    }

    $w.scroll(unveil);
    $w.resize(unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
