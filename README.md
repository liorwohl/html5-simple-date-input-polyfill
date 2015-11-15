# html5-simple-date-input-polyfill
Just include this simple script and IE (>=10) and Firefox will support &lt;input type="date">, without any dependencies, not even jQuery!

Support dynamically created inputs, so can be used in single page applications.

Support AngularJS (and possibly other libraries) bindings.

# Install
npm install html5-simple-date-input-polyfill --save

then add to your JS (if using browserify): require('html5-simple-date-input-polyfill'); 
(Or with &lt;script src="html5-simple-date-input-polyfill.min.js"></script>)

and to your SCSS: @import "../node_modules/html5-simple-date-input-polyfill/html5-simple-date-input-polyfill.scss";
(or just copy and edit the CSS, its a very short code)