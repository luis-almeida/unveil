function Unveil(selector, threshold, callback) {

  var th = threshold || 0,
      retina = window.devicePixelRatio > 1,
      images = document.querySelectorAll(selector),
      timeout;

  window.addEventListener("scroll", throttle);
  window.addEventListener("resize", throttle);

  function throttle() {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(lookup, 200);
  }

  function lookup() {
    images = [].filter.call(images, function(image) {
      if (hidden(image)) return true;
      if (inview(image)) unveil(image);
      else return true;
    });
    if (images.length === 0) {
      window.removeEventListener("scroll", throttle);
      window.removeEventListener("resize", throttle);
    }
  }

  function hidden(image) {
    return image.offsetWidth <= 0 && image.offsetHeight <= 0;
  }

  function inview(image) {
    var wt = window.pageYOffset,
        wb = wt + document.documentElement.clientHeight,
        it = image.offsetTop,
        ib = it + image.height;
    return ib >= wt - th && it <= wb + th;
  }

  function unveil(image) {
    var source = retina ? image.getAttribute("data-src-retina") : null;
    source = source || image.getAttribute("data-src");
    if (source) image.setAttribute("src", source);
    if (typeof callback === "function") callback.call(image);
  }

  lookup();

  return lookup;

}
