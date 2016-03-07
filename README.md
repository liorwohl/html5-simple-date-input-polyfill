# nodep-date-input-polyfill
Just include this simple script and IE, Firefox, and OS X Safari will support `<input type="date">`, without any dependencies, not even jQuery!

Support dynamically created inputs, so can be used in single page applications.

Forked from [html5-simple-date-input-polyfill](https://www.npmjs.com/package/html5-simple-date-input-polyfill). Continuing as a separate project.

## Install
`npm install --save nodep-date-input-polyfill`

Add to your project:

* **Webpack/Browserify:** `require('nodep-date-input-polyfill');`

    or alongside **Babel:** `import 'nodep-date-input-polyfill';`

* **Script Tag:** Copy `nodep-date-input-polyfill.dist.js` from `node_modules` and
include it anywhere in your HTML.

then add to your JS (if using browserify): require('nodep-date-input-polyfill'); 
(Or with `<script src="nodep-date-input-polyfill.dist.js"></script>`)

## Contributing

### Local Development
Run `webpack-dev-server --host $IP --port $PORT`

### Build
Run `webpack --devtool=none`