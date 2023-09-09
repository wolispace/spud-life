:: start https://www.toptal.com/developers/javascript-minifier
:: https://www.digitalocean.com/community/tools/minify

set ALLFILES=_js_files.js
echo "" > %ALLFILES%

for /R "src" %%f in (*.js) do type "%%f" >> %ALLFILES%

terser %ALLFILES% --output _js_files.min.js -c -m toplevel
