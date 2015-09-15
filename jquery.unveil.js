// Licensed under the MIT license.
// Copyright 2014 Luís Almeida
// https://github.com/luis-almeida/unveil

;(function($) {

  $.fn.unveil = function(opts) {

    opts = opts || {};

    var $w = $(window),
        $c = opts.container || $w,
        th = opts.threshold || 0,
        wh = $w.height(),
        cb = opts.callback,
        useRAF = opts.useRAF || false,
        retina = window.devicePixelRatio > 1,
        attrib = retina ? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      if (opts.custom) return;
      var $img = $(this), src = $img.attr(attrib);
      src = src || $img.attr("data-src");
      if (src) {
        $img.attr("src", src).trigger("unveiled");
        if (typeof cb === "function") cb.call(this);
      }
    });

    function unveil() {
      var wt = $w.scrollTop(),
        wb = wt + wh,
        ct = $c !== $w ? wt - $c.offset().top : 0,
        et,
        eb;
      
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;
        
        et = $e.offset().top + ct;
        eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    function resize() {
      wh = $w.height();
      unveil();
    }

    function debounce(fn) {
      var timer, oldTimestamp;
      if (useRAF && window.requestAnimationFrame) {
        var _raf = function (timestamp) {
          if (!oldTimestamp) {
            oldTimestamp = timestamp;
          }
          if (timestamp - oldTimestamp < (opts.debounce || 0)) {
            timer = window.requestAnimationFrame(_raf)
          } else {
            fn();
          }
        };
        
        return function () {
          if (timer) window.cancelAnimationFrame(timer);
          oldTimestamp = undefined;
          timer = window.requestAnimationFrame(_raf);
        }
      }
      
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, opts.debounce || 0);
      };
    }

    $c.on({
      "resize.unveil": debounce(resize),
      "scroll.unveil": debounce(unveil),
      "lookup.unveil": unveil
    });

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
