$folderPath = "E:\pdf-extractor\store" # Ändern Sie dies in den Pfad Ihres Ordners

Get-ChildItem -Path $folderPath -Recurse -File | ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    # Einzeilige Kommentare entfernen
    $content = $content -replace '//.*?$','' -split "`n" | Where-Object { $_.Trim() -ne "" }

    # Mehrzeilige Kommentare entfernen
    $content = $content -replace '/\*.*?\*/','' -split "`n" | Where-Object { $_.Trim() -ne "" }

    # Geänderten Inhalt zurück in die Datei schreiben
    $content -join "`n" | Set-Content $_.FullName
}
