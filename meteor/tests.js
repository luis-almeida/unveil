'use strict';

Tinytest.add('Unveil integration', function (test) {

    var img = document.createElement('img');
    img.className = 'unveil';
    img.setAttribute('src', '20x20.jpg');
    img.setAttribute('alt', 'image');
    img.setAttribute('height', '20px');
    img.setAttribute('width', '20px');
    var unveiling = jQuery('img').unveil();

    test.isNotNull(unveiling, 'instantiation OK');
});