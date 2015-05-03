# html5-simple-date-input-polyfill
Just include this simple script and IE and Firefox will support &lt;input type="date">, without any dependencies.

This is just a repackaging of https://github.com/joshsalverda/datepickr/blob/master/src/datepickr.js
I just added some line of code to make it automatically work with &lt;input type="date">, a proper package.json file so it will work with "npm install" and fixed some small bugs.

# Install
npm install git://github.com/liorwohl/html5-simple-date-input-polyfill --save --force

then add to your JS (if using browserify): require('html5-simple-date-input-polyfill'); 

and to your SCSS: @import "../node_modules/html5-simple-date-input-polyfill/main.css";