#unveil.js
###A very lightweight plugin to lazy load images



Most of us are familiar with the [Lazy Load](http://www.appelsiini.net/projects/lazyload) plugin by [Mika Tuupola](http://www.appelsiini.net/).
This plugin is very useful and it boosts performance delaying loading of images in long web pages because images outside of viewport (visible part of web page) won't be loaded until the user scrolls to them.
Lazy Load has some cool options such as custom effects, container, events or data attribute. If you're not gonna use any of them you can reduce the file size by leaving just the essential code to show the images.
That's what I did and this is my lightweight version of Lazy Load with support for serving high-resolution images to devices with retina displays - less than 1k.

Visit unveil's [project page](http://luis-almeida.github.com/unveil/) to read the documentation and see the demo.



#### Usage
Use a placeholder image in the src attribute - something to be displayed while the original image loads - and include the actual image source in a "data-src" attribute.
If you want to serve high-resolution images to devices with retina displays, you just have to include the source for those images in a "data-src-retina" attribute.
You don't need to include a "data-src-retina" attribute in all the image tags, unveil is smart enough to fallback to "data-src" or even do nothing in case there isn't any "data-src" specified.
```html
<img src="bg.png" data-src="img1.jpg" />
<img src="bg.png" data-src="img2.jpg" data-src-retina="img2-retina.jpg" />
```
If you care about users without javascript enabled, you can include the original image inside a ```noscript``` tag:
```html
<noscript>
  <img src="bg.png" src="img1.jpg" />
</noscript>
```
Run the script on document ready:
```javascript
$(document).ready(function() {
  $("img").unveil();
});
```



###Option
By default, images are only loaded and "unveiled" when user scrolls to them and they became visible on the screen.
If you want your images to load earlier than that, lets say 200px before they appear in the viewport, you just have to:
```javascript
$("img").unveil( 200 );
```



###Trigger
You can still trigger image loading whenever you need.
All you have to do is select the images you want to "unveil" and trigger the event:
```javascript
$("img").trigger( "unveil" );
```



###Demo
Visit [project page](http://luis-almeida.github.com/unveil/) to see it working.



###License
Unveil is licensed under the [MIT license](http://opensource.org/licenses/MIT).
