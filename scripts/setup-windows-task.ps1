# =========================================================================
# DANG KY WINDOWS TASK SCHEDULER: NGOC GAS DAILY RECIPE PUBLISHER
# Lich chay: 08:00:00 sang cac ngay Thu 2 - Thu 7 hang tuan
# Co che: Tu dong chay bu ngay khi mo may neu lo gio (StartWhenAvailable)
# =========================================================================

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $scriptDir) { $scriptDir = $PSScriptRoot }
$workingDir = Split-Path -Parent $scriptDir
$batchPath = Join-Path $scriptDir "run-daily-post.bat"
$taskName = "NgocGas_Daily_Recipe_Publisher"

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  THIET LAP WINDOWS TASK SCHEDULER CHO NGOC GAS" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Folder du an: $workingDir" -ForegroundColor Yellow
Write-Host "File batch: $batchPath" -ForegroundColor Yellow

# 1. Kiem tra file batch ton tai
if (-not (Test-Path $batchPath)) {
    Write-Error "Khong tim thay file batch tai: $batchPath"
    exit 1
}

# 2. Tao Action
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$batchPath`"" -WorkingDirectory $workingDir

# 3. Tao Trigger: 8h00 sang cac ngay Thu 2 den Thu 7 (Mon, Tue, Wed, Thu, Fri, Sat)
$daysOfWeek = @("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek $daysOfWeek -At "08:00:00"

# 4. Tao Settings: Tu dong chay bu neu mo may muon (StartWhenAvailable), cho phep chay khi dung pin
$settings = New-ScheduledTaskSettingsSet `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Hours 2) `
    -MultipleInstances IgnoreNew

# 5. Kiem tra va dang ky Task
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "Task '$taskName' da ton tai. Dang cap nhat lai..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

$description = "Tu dong viet va dang 4 bai mon an moi ngay luc 8h00 sang tu Thu 2 den Thu 7 cho website Ngoc Gas (kem chay bu neu mo may muon)."
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description $description

Write-Host "`n[THANH CONG] Da dang ky task '$taskName' vao Windows Task Scheduler!" -ForegroundColor Green
Write-Host "  - Lich trinh: 08:00:00 AM (Thu 2 -> Thu 7)" -ForegroundColor Cyan
Write-Host "  - Che do chay bu: BAT (Tu dong chay ngay khi bat may neu mo sau 8h)" -ForegroundColor Cyan
Write-Host "  - Nhat ky chay duoc luu tai: $workingDir\logs\daily-post.log" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Green

# Kiem tra lai task vua dang ky
Get-ScheduledTask -TaskName $taskName | Format-List TaskName, State, Description
