# nodep-date-input-polyfill
Just include this simple script and IE, Firefox, and OS X Safari will support `<input type="date">`, without any dependencies, not even jQuery!

Support dynamically created inputs, so can be used in single page applications.

# Install
`npm install --save html5-simple-date-input-polyfill`

then add to your JS (if using browserify): require('html5-simple-date-input-polyfill'); 
(Or with `<script src="html5-simple-date-input-polyfill.min.js"></script>`)

and to your SCSS: @import "../node_modules/html5-simple-date-input-polyfill/html5-simple-date-input-polyfill.scss";
(or just copy and edit the CSS, its a very short code)