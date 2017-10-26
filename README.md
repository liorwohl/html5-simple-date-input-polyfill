# html5-simple-date-input-polyfill
Just include this simple script and IE (>=10) and Firefox will support `<input type="date">` without any dependencies, not even jQuery! 🎉

Support dynamically created inputs, so can be used in single page applications.

Support [AngularJS](https://github.com/angular/angular.js) (and possibly other libraries) bindings.

# Usage

#### browserify

`npm install html5-simple-date-input-polyfill --save`

`require('html5-simple-date-input-polyfill');`

#### Browser

`<link rel="stylesheet" href="html5-simple-date-input-polyfill.css" />`

`<script src="html5-simple-date-input-polyfill.min.js"></script>`

#### SCSS (optional)
`@import "../node_modules/html5-simple-date-input-polyfill/html5-simple-date-input-polyfill.scss";`
