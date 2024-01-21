$folderPath = 'H:\SCUMai' # Bitte ersetze 'Pfad_zu_deinem_Ordner' mit dem tatsächlichen Pfad
$images = Get-ChildItem -Path $folderPath -Recurse -Include *.jpg,*.png,*.gif,*.bmp | Select-Object -ExpandProperty FullName

while ($true) {
    $randomImage = Get-Random -InputObject $images
    Start-Process 'rundll32.exe' -ArgumentList "C:\WINDOWS\System32\shimgvw.dll,ImageView_Fullscreen $randomImage"
    Start-Sleep -Seconds 2
}
