# Dateipfade der zu kopierenden Dateien
$files = @(
    "E:\pdf-extractor\components\Teleprompter\ControlPanel.js",
    "E:\pdf-extractor\hooks\useRandomParagraph.js",
    "E:\pdf-extractor\store\teleprompterSlice.js",
    "E:\pdf-extractor\components\Teleprompter\index.js"
)

# Zielpfad für die Ausgabedatei
$outputFilePath = "E:\pdf-extractor\code_data.txt"

# Initialisiere eine Variable, um den gesamten Code zu speichern
$codeContent = ""

# Schleife über jede Datei
foreach ($file in $files) {
    # Lese den Dateiinhalt
    $content = Get-Content $file -Raw

    # Füge den Dateiinhalt zur Gesamtvariablen hinzu
    $codeContent += "------------------------------------------------------------`r`n"
    $codeContent += "Datei: $file`r`n"
    $codeContent += "------------------------------------------------------------`r`n"
    $codeContent += $content
    $codeContent += "`r`n`r`n"
}

# Schreibe den gesamten Code in die Ausgabedatei
$codeContent | Out-File -FilePath $outputFilePath -Encoding UTF8

Write-Host "Code wurde erfolgreich in $outputFilePath gespeichert."
