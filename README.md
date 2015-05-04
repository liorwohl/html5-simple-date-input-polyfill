# html5-simple-date-input-polyfill
Just include this simple script and IE (>=10) and Firefox will support &lt;input type="date">, without any dependencies, not even jQuery!

Support dynamically created inputs, so can be used in single page applications.

# Install
npm install git://github.com/liorwohl/html5-simple-date-input-polyfill --save --force

then add to your JS (if using browserify): require('html5-simple-date-input-polyfill'); 

and to your SCSS: @import "../node_modules/html5-simple-date-input-polyfill/main.css";
(or just copy and edit the CSS, its a very short code)