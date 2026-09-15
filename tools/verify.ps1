# Verify downloaded MCCB source worlds against SHA256SUMS.txt (Windows PowerShell).
#
#   pwsh ./tools/verify.ps1                 # files next to SHA256SUMS.txt
#   pwsh ./tools/verify.ps1 -Path .\dl      # files in another folder
#
# Exits 0 only if all six files are present and match.

[CmdletBinding()]
param(
    [string]$Path = (Split-Path -Parent $PSScriptRoot)
)

$sums = Join-Path (Split-Path -Parent $PSScriptRoot) 'SHA256SUMS.txt'
if (-not (Test-Path -LiteralPath $sums)) {
    Write-Error "SHA256SUMS.txt not found at $sums"
    exit 2
}

$failed = 0
$checked = 0

foreach ($line in Get-Content -LiteralPath $sums) {
    $trimmed = $line.Trim()
    if ($trimmed -eq '' -or $trimmed.StartsWith('#')) { continue }

    # Format: "<64 hex>  <name>" or "<64 hex> *<name>"
    if ($trimmed -notmatch '^([0-9a-fA-F]{64})\s+\*?(.+)$') {
        Write-Warning "Unparsable line: $trimmed"
        $failed++
        continue
    }

    $expected = $Matches[1].ToLower()
    $name     = $Matches[2].Trim()
    $file     = Join-Path $Path $name
    $checked++

    if (-not (Test-Path -LiteralPath $file)) {
        Write-Host "$name : MISSING" -ForegroundColor Yellow
        $failed++
        continue
    }

    $actual = (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLower()
    if ($actual -eq $expected) {
        Write-Host "$name : OK" -ForegroundColor Green
    }
    else {
        Write-Host "$name : FAILED" -ForegroundColor Red
        Write-Host "    expected $expected"
        Write-Host "    actual   $actual"
        $failed++
    }
}

Write-Host ''
if ($failed -eq 0 -and $checked -gt 0) {
    Write-Host "$checked/$checked files verified." -ForegroundColor Green
    exit 0
}

Write-Host "$failed of $checked file(s) did not verify." -ForegroundColor Red
exit 1
