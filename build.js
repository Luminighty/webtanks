const browserify = require('browserify');
const tsify = require('tsify');
const emsify = require('esmify');
const babelify = require('babelify');
const fs = require('fs');

browserify({ debug: true })
  .add('dist/src/client/index.js')
//  .plugin(emsify)
//  .plugin(tsify, { allowJs: true, global: true, target: 'es5' })
  .bundle()
  .on('error', function (error) { console.error(error.toString()); })
  .pipe(process.stdout);

// .pipe(fs.createWriteStream('bundle.js'));
// .transform(babelify, { extensions: ['.tsx', '.ts'] })
// .plugin(tsify, { noImplicitAny: true, global: true, target: 'es6' })

/**
browserify .\\src\\client\\main.ts -p esmify -p tsify -o .\\public_html\\bundle.js
*/
