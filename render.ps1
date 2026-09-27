<#
.SYNOPSIS
    Compila el sitio Web Quarto a '_site/' y genera el PDF de 2 páginas tamaño Carta Horizontal.
.DESCRIPTION
    Compila todo el sitio Quarto (index.qmd, assets, etc.) en '_site/' y utiliza el motor
    headless de Edge para generar el PDF de impresión a partir de '_site/index.html'.
#>

$ErrorActionPreference = "Stop"

Write-Host "🍺 [1/3] Compilando sitio Web Quarto en '_site/'..." -ForegroundColor Cyan

# Buscar Quarto en PATH o instalación típica de RStudio
$quartoCmd = Get-Command quarto -ErrorAction SilentlyContinue
if ($quartoCmd) {
    $quartoExe = $quartoCmd.Source
} elseif (Test-Path "C:\Program Files\RStudio\resources\app\bin\quarto\bin\quarto.exe") {
    $quartoExe = "C:\Program Files\RStudio\resources\app\bin\quarto\bin\quarto.exe"
} else {
    throw "No se encontró el ejecutable de Quarto en el sistema."
}

# Compilar todo el proyecto / sitio
& $quartoExe render

# Copiar assets estáticos adicionales si se requiere en _site/assets
if (Test-Path "assets") {
    if (-not (Test-Path "_site\assets")) {
        New-Item -ItemType Directory -Path "_site\assets" -Force | Out-Null
    }
    Copy-Item -Path "assets\*" -Destination "_site\assets\" -Recurse -Force
}


Write-Host "📄 [2/3] Generando PDF de impresión de 2 páginas (Letter Landscape)..." -ForegroundColor Cyan

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$projectRoot = (Get-Location).Path
$htmlPath = "$projectRoot\_site\index.html"
$pdfPath = "$projectRoot\_site\diptico-cerveza.pdf"

if (Test-Path $edgePath) {
    Start-Process -FilePath $edgePath -ArgumentList "--headless=new", "--no-pdf-header-footer", "--print-to-pdf=$pdfPath", "file:///$($htmlPath.Replace('\', '/'))" -Wait
    Write-Host "✨ [3/3] Sitio Web y PDF generados exitosamente en '_site/'." -ForegroundColor Green
    Write-Host "   - 🌐 Sitio Web compilado:     _site/index.html" -ForegroundColor Yellow
    Write-Host "   - 📋 Bitácora de cata:        _site/assets/degustacion.html" -ForegroundColor Yellow
    Write-Host "   - 📚 Catálogo cervecero:      _site/assets/catalogo.html" -ForegroundColor Yellow
    Write-Host "   - 🖨️ PDF para impresión:      _site/diptico-cerveza.pdf" -ForegroundColor Yellow
} else {
    Write-Host "⚠️ No se encontró Microsoft Edge para la exportación directa a PDF." -ForegroundColor Yellow
    Write-Host "   Abra '_site/index.html' en el navegador y use el botón 'Imprimir / Guardar en PDF'." -ForegroundColor Yellow
}
