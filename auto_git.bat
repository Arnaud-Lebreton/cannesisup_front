@echo off
set  = "";

set /p commit= "Git commit word :" 
git add -A
git commit -m '%commit%'
git push

echo is pushed