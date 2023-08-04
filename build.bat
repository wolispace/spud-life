
type "js\utils.js"      > _js_files.js
type "js\svg.js"       >> _js_files.js
type "js\scanner.js"   >> _js_files.js
type "js\sky.js"       >> _js_files.js
type "js\character.js" >> _js_files.js
type "js\player.js"    >> _js_files.js
type "js\customers.js" >> _js_files.js
type "js\basket.js"    >> _js_files.js
type "js\potatadex.js" >> _js_files.js
type "js\home.js"      >> _js_files.js
type "js\hardware.js"  >> _js_files.js
type "js\shop.js"      >> _js_files.js
type "js\machines.js"  >> _js_files.js
type "js\tools.js"     >> _js_files.js
type "js\spuds.js"     >> _js_files.js
type "js\controls.js"  >> _js_files.js
type "js\fields.js"    >> _js_files.js
type "js\hint.js"      >> _js_files.js
type "js\dialog.js"    >> _js_files.js
type "js\main.js"      >> _js_files.js

:: start https://www.toptal.com/developers/javascript-minifier
:: https://www.digitalocean.com/community/tools/minify
terser _js_files.js --output _js_files.min.js -c -m
