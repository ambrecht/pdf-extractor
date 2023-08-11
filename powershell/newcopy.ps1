# Pfad zum Verzeichnis, das Sie durchlaufen möchten
#$directoryPath = "E:\pdf-extractor\components\Teleprompter"
$directoryPath = "E:\pdf-extractor\store"

# Pfad zur Ausgabedatei
$outputFile = "E:\pdf-extractor\store.txt"

# Löscht die Ausgabedatei, falls sie bereits existiert
if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

# Funktion, die rekursiv durch das Verzeichnis geht und den Inhalt jeder Datei in die Ausgabedatei schreibt
function Write-ContentToFile {
    param (
        [string]$path
    )

    # Durchläuft alle Dateien im aktuellen Verzeichnis
    Get-ChildItem -Path $path -File | ForEach-Object {
        # Schreibt den vollständigen Pfad der Datei in die Ausgabedatei
        Add-Content -Path $outputFile -Value "Verzeichnispfad von $($_.Name) ist $($_.FullName):`r`n"

        # Schreibt den Inhalt der Datei in die Ausgabedatei
        Get-Content -Path $_.FullName | Add-Content -Path $outputFile

        # Fügt eine Leerzeile zwischen den Dateien hinzu
        Add-Content -Path $outputFile -Value "`r`n"
    }

    # Durchläuft alle Unterverzeichnisse im aktuellen Verzeichnis
    Get-ChildItem -Path $path -Directory | ForEach-Object {
        Write-ContentToFile -path $_.FullName
    }
}

# Ruft die Funktion auf, um den Prozess zu starten
Write-ContentToFile -path $directoryPath

Write-Host "Dateien wurden erfolgreich in $outputFile geschrieben."
