
type "src\utils.js"      > _js_files.js
type "src\svg.js"       >> _js_files.js
type "src\controls.js"  >> _js_files.js
type "src\main.js"      >> _js_files.js

:: start https://www.toptal.com/developers/javascript-minifier
:: https://www.digitalocean.com/community/tools/minify
terser _js_files.js --output _js_files.min.js -c -m toplevel
