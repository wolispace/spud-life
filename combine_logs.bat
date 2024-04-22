
set ALLFILES=_all_logs.csv
echo "" > %ALLFILES%

for /R "_saves" %%f in (*.txt) do type "%%f" >> %ALLFILES%