:: start https://www.toptal.com/developers/javascript-minifier
:: https://www.digitalocean.com/community/tools/minify

:: npm install terser -g

set ALLFILES=_js_files.js
echo "" > %ALLFILES%

for /R "src1" %%f in (*.js) do type "%%f" >> %ALLFILES%
for /R "src2" %%f in (*.js) do type "%%f" >> %ALLFILES%
for /R "src3" %%f in (*.js) do type "%%f" >> %ALLFILES%

terser %ALLFILES% --output _js_files.min.js -c -m toplevel
