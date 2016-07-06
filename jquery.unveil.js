// Licensed under the MIT license.
// Copyright 2014 Luís Almeida
// https://github.com/luis-almeida/unveil

'use strict';
(function ($) {

  $.fn.unveil = function (opts) {

    opts = opts || {};

    var $w = $(window),
      $c = opts.container || $w,
      th = opts.threshold || 0,
      wh = $w.height(),
      cb = opts.callback,
      useRAF = opts.useRAF || false,
      retina = window.devicePixelRatio > 1,
      attrib = retina ? 'data-src-retina' : 'data-src',
      images = this.toArray();

    var unveilEvt;
    if (window.CustomEvent && typeof window.CustomEvent === 'function') {
      unveilEvt = new CustomEvent('unveil');
    } else {
      unveilEvt = document.createEvent('CustomEvent');
      unveilEvt.initCustomEvent('unveil', true, true, {});
    }

    var unveiledEvt;
    if (window.CustomEvent && typeof window.CustomEvent === 'function') {
      unveiledEvt = new CustomEvent('unveiled');
    } else {
      unveiledEvt = document.createEvent('CustomEvent');
      unveiledEvt.initCustomEvent('unveiled', true, true, {});
    }

    function cacheStyles() {
      //var baseRect = document.body.getBoundingClientRect();
      images.forEach(function (elem) {
        //elem.topOffset = elem.getBoundingClientRect().top - baseRect.top;
        elem.compStyle = getComputedStyle(elem);
      });
    }


    cacheStyles();

    this.one('unveil', function () {
      if (opts.custom) return;
      var $img = $(this),
        src = $img.attr(attrib);
      src = src || $img.attr('data-src');
      if (src) {
        if (this.tagName === 'IMG') {
          $img.attr('src', src);

          $img[0].dispatchEvent(unveiledEvt);
        } else {
          $img.css({
            backgroundImage: 'url(' + src + ')'
          });
        }
        if (typeof cb === 'function') cb.call(this);
      }
    });

    function unveil() {
      var wt = $c.scrollTop(),
        wb = wt + wh,
        ct = $c !== $w ? wt - $c.offset().top : 0,
        et,
        eb;

      images = images.filter(function (elem) {
        et = $(elem).offset().top + ct;
        var style = elem.compStyle;
        eb = et + parseInt(style.marginTop) + parseInt(style.marginBottom) + elem.offsetHeight;

        if (eb >= wt - th && et <= wb + th) {
          window.requestAnimationFrame(function () {
            elem.dispatchEvent(unveilEvt);
          });
          return false;
        }
        return true;
      });


      if (images.length === 0) {
        //console.log('empty');
      }
    }




    function resize() {
      wh = $w.height();
      cacheStyles();
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
            timer = window.requestAnimationFrame(_raf);
          } else {
            fn();
          }
        };

        return function () {
          if (timer) window.cancelAnimationFrame(timer);
          oldTimestamp = undefined;
          timer = window.requestAnimationFrame(_raf);
        };
      }

      return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, opts.debounce || 0);
      };
    }

    $c.on({
      'resize.unveil': debounce(resize),
      'scroll.unveil': debounce(unveil),
      'lookup.unveil': unveil
    });

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
