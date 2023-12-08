:: start https://www.toptal.com/developers/javascript-minifier
:: https://www.digitalocean.com/community/tools/minify

:: npm install terser -g

:: mjor, minor or patch
"W:\My Drive\Wallace\Utilities\Php\php_743\php.exe" rollVersion.php minor

start "" http://localhost/build.php
timeout /t 5

set ALLFILES=_js_files.js
echo "" > %ALLFILES%

for /R "src1" %%f in (*.js) do type "%%f" >> %ALLFILES%
for /R "src2" %%f in (*.js) do type "%%f" >> %ALLFILES%
for /R "src3" %%f in (*.js) do type "%%f" >> %ALLFILES%

terser %ALLFILES% --output _js_files.min.js --compressed
