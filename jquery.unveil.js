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

  $.fn.unveil = function(args, callback) {

    // unveil's original attribute names
    var ATTRIB = "data-src";
    var RETINA_ATTRIB = "data-src-retina"

    // set the defaults for the data attributes
    var attribName = {
      standard: ATTRIB,
      retina: RETINA_ATTRIB
    }

    var threshold,
      callback;

    // determine if the first parameter is an object or number
    if (typeof args === "object") {
      threshold = args.threshold;
      callback = args.callback;
      if (typeof args.attrib === "string") {
        attribName.standard = args.attrib;
      }
      if (typeof args.retinaAttrib === "string") {
        attribName.retina = args.retinaAttrib;
      }
    } else {
      threshold = args;
      callback = callback;
    }

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina ? attribName.retina : attribName.standard,
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute(attribName.standard);
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
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }
    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
