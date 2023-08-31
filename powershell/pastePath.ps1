$folderPath = "E:\pdf-extractor\store" # Pfad zum Hauptordner

Get-ChildItem -Path $folderPath -Recurse -File | ForEach-Object {
    $filePath = $_.FullName
    $comment = "// " + $filePath
    $tempFile = New-TemporaryFile
    Set-Content -Path $tempFile.FullName -Value $comment
    Get-Content -Path $filePath | Add-Content -Path $tempFile.FullName
    Move-Item -Path $tempFile.FullName -Destination $filePath -Force
}

Write-Host "Pfade wurden zu allen Dateien hinzugefügt."
