# Setzen Sie die Pfade der Laufwerke
$drivePath1 = 'F:\'
$drivePath2 = 'K:\'

# Holen Sie die Dateilisten von beiden Laufwerken
$drive1Files = Get-ChildItem -Recurse -Path $drivePath1 -File | Select-Object -ExpandProperty FullName
$drive2Files = Get-ChildItem -Recurse -Path $drivePath2 -File | Select-Object -ExpandProperty FullName

# Vergleichen Sie die Dateilisten
$comparison = Compare-Object -ReferenceObject $drive1Files -DifferenceObject $drive2Files

# Zeigen Sie die Unterschiede an
$comparison | ForEach-Object {
    if ($_.SideIndicator -eq '<=') {
        "Datei nur auf Laufwerk F: $($_.InputObject)"
    } elseif ($_.SideIndicator -eq '=>') {
        "Datei nur auf Laufwerk K: $($_.InputObject)"
    }
}
