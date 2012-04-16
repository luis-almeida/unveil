#unveil.js  
###A very lightweight plugin to lazy load images  
  
  
  
Most of us are familiar with the [Lazy Load](http://www.appelsiini.net/projects/lazyload) plugin by [Mika Tuupola](http://www.appelsiini.net/).  
This plugin is very useful and it boosts performance delaying loading of images in long web pages because images outside of viewport (visible part of web page) won't be loaded until the user scrolls to them.  
Lazy Load has some cool options such as custom effects, container, events or data attribute. If you're not gonna use any of them you can reduce the file size by leaving just the essential code to show the images.  
That's what I did and this is my lightweight version of Lazy Load - less than 0.5kb.  
  
Visit unveil's [project page](http://luis-almeida.github.com/unveil/) to read the documentation and see the demo.
  
  
  
#### Usage  
Include the actual image source in a "data-src" attribute.  
Use a placeholder image in the src attribute, something to be displayed while the original image loads.  
  
<pre>&t;img src="bg.png" data-src="img.jpg" /></pre>  
  
<pre>$("img").unveil();</pre>
  
  
  
###Option  
By default, images are only loaded and "unveiled" when user scrolls to them and they became visible on the screen.  
If you want your images to load earlier than that, lets say 200px before they get visible, you just have to:  
  
<pre>$("img").unveil( 200 );</pre>
  
  
  
###Trigger  
You can still trigger image loading whenever you need.  
All you have to do is select the images you want to "unveil" and trigger the event:  
  
<pre>$("img").trigger( "unveil" );</pre>
  
  
  
###Demo  
Visit [project page](http://luis-almeida.github.com/unveil/) to see it working.