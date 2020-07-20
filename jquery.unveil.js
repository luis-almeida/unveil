/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

; (function ($) {

  $.fn.unveil = function (threshold, dataOptions, callback) {
    var $w = $(window),
      th = threshold || 0,
      images = this,
      loaded,
      attrib = [];

    dataSrcOptions();

    this.one("unveil", function () {
      var source = undefined;
      attrib.every(element => {
        source = this.getAttribute(element);
        if (source) return false;
        return true;
      })

      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function unveil() {
      var inview = images.filter(function () {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
          wb = wt + $w.height(),
          et = $e.offset().top,
          eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    function isRetina() {
      return window.devicePixelRatio > 1;
    }

    function dataSrcOptions() {
      dataOptions.push([isRetina, "data-src-retina"]);
      if (dataOptions != undefined && dataOptions.length > 0) {
        dataOptions.forEach(element => {
          if (element != undefined && element.length > 1 && typeof element[0] === "function" && element[0]())
            attrib.push(element[1]);
        })
      }

      attrib.push("data-src");
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
