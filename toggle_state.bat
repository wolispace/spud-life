if exist _dXev.txt goto DEV_OFF

:DEV_ON
ren _dev.txt _dXev.txt
goto END

:DEV_OFF
ren _dXev.txt _dev.txt

:END

