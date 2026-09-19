@echo off
chcp 65001 >nul
REM =========================================================================
REM NGOC GAS - DAILY AUTOMATED 4 RECIPES PUBLISHER
REM Runs Mon-Sat at 08:00 AM via Windows Task Scheduler
REM =========================================================================

cd /d "%~dp0.."

if not exist "logs" mkdir "logs"

echo [%date% %time%] Khoi chay tu dong dang 4 bai mon an... >> "logs\daily-post.log"

node "scripts\cron-daily-4-recipes.mjs" >> "logs\daily-post.log" 2>&1

echo [%date% %time%] Hoan tat quy trinh ngay. >> "logs\daily-post.log"
