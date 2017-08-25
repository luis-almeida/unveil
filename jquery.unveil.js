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

  $.fn.unveil = function(threshold, callback) {

    var $w           = $(window),
        th           = threshold || 0,
        retina       = window.devicePixelRatio > 1,
        attrib       = "data-src",
        attribRetina = "data-src-retina",
        images       = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute( retina && this.hasAttribute(attribRetina) ? attribRetina : attrib);
      if (source) {
        if (this.tagName.toUpperCase() === "IMG") {
          this.setAttribute("src", source);
        } else {
          this.style.backgroundImage      = "url('" + source + "')";
          this.style.backgroundAttachment = this.hasAttribute(attrib + "-attachment") ? this.getAttribute(attrib + "-attachment") : (this.style.backgroundAttachment || "scroll");
          this.style.backgroundColor      = this.hasAttribute(attrib + "-color")      ? this.getAttribute(attrib + "-color")      : (this.style.backgroundColor      || "transparent");
          this.style.backgroundPosition   = this.hasAttribute(attrib + "-position")   ? this.getAttribute(attrib + "-position")   : (this.style.backgroundPosition   || "center center");
          this.style.backgroundRepeat     = this.hasAttribute(attrib + "-repeat")     ? this.getAttribute(attrib + "-repeat")     : (this.style.backgroundRepeat     || "no-repeat");
          this.style.backgroundSize       = this.hasAttribute(attrib + "-size")       ? this.getAttribute(attrib + "-size")       : (this.style.backgroundSize       || "cover");
        }
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
