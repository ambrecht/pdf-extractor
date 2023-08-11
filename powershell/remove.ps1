$directoryPath = "E:\pdf-extractor\hooks" # Ändern Sie dies in den Pfad Ihres Verzeichnisses

Get-ChildItem -Path $directoryPath -Filter *.js -Recurse | ForEach-Object {
    $filePath = $_.FullName
    $fileContent = Get-Content -Path $filePath

    $newContent = @()
    $fileContent | ForEach-Object {
        if ($_ -notmatch "console\.log\(") {
            $newContent += $_
        }
    }

    Set-Content -Path $filePath -Value $newContent
    Write-Host "Entfernte console.log-Aufrufe aus $filePath"
}
