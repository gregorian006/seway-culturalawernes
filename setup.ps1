# Setup Helper Script for Windows PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Sumatera Culture Fest - Setup Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "[OK] .env.local file exists" -ForegroundColor Green
} else {
    Write-Host "[!] .env.local not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "[OK] .env.local created. Please edit this file with your credentials." -ForegroundColor Green
}

Write-Host ""

# Check Node.js version
Write-Host "Checking Node.js version..." -ForegroundColor Cyan
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "[OK] Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "[X] Node.js not found. Please install Node.js 18+ from nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if node_modules exists
if (Test-Path "node_modules") {
    Write-Host "[OK] Dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "[!] Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "[OK] Dependencies installed" -ForegroundColor Green
}

Write-Host ""

# Read .env.local and check which variables are set
Write-Host "Checking environment variables..." -ForegroundColor Cyan
$envContent = Get-Content ".env.local" -Raw

$checks = @{
    "GROQ_API_KEY" = $false
    "DATABASE_URL" = $false
    "NEXTAUTH_SECRET" = $false
    "GOOGLE_CLIENT_ID" = $false
    "GOOGLE_CLIENT_SECRET" = $false
}

foreach ($key in $checks.Keys) {
    if ($envContent -match "$key=(?!your-|xxxxx|password@containers)[\w-]+") {
        Write-Host "[OK] $key is configured" -ForegroundColor Green
        $checks[$key] = $true
    } else {
        Write-Host "[!] $key needs to be configured" -ForegroundColor Yellow
        $checks[$key] = $false
    }
}

Write-Host ""

# Count missing variables
$missing = ($checks.Values | Where-Object { $_ -eq $false }).Count

if ($missing -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "All environment variables are configured!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Setting up database..." -ForegroundColor Cyan
    npx prisma generate
    npx prisma db push
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Setup complete! You can now run:" -ForegroundColor Green
    Write-Host "  npm run dev" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "$missing environment variable(s) need configuration" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    
    if (-not $checks["GOOGLE_CLIENT_ID"] -or -not $checks["GOOGLE_CLIENT_SECRET"]) {
        Write-Host "To setup Google OAuth:" -ForegroundColor Cyan
        Write-Host "  1. Read GOOGLE_OAUTH_SETUP.md" -ForegroundColor White
        Write-Host "  2. Visit: https://console.cloud.google.com/" -ForegroundColor White
        Write-Host ""
    }
    
    if (-not $checks["DATABASE_URL"]) {
        Write-Host "To setup PostgreSQL Database:" -ForegroundColor Cyan
        Write-Host "  1. Read RAILWAY_POSTGRESQL_SETUP.md" -ForegroundColor White
        Write-Host "  2. Visit: https://railway.app/" -ForegroundColor White
        Write-Host ""
    }
    
    if (-not $checks["NEXTAUTH_SECRET"]) {
        Write-Host "To generate NEXTAUTH_SECRET:" -ForegroundColor Cyan
        Write-Host "  Run: node -e `"console.log(require('crypto').randomBytes(32).toString('base64'))`"" -ForegroundColor White
        Write-Host "  Then paste the output to .env.local" -ForegroundColor White
        Write-Host ""
    }
    
    Write-Host "After configuring .env.local, run this script again:" -ForegroundColor Cyan
    Write-Host "  .\setup.ps1" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "For detailed setup instructions, read:" -ForegroundColor Cyan
Write-Host "  COMPLETE_SETUP_GUIDE.md" -ForegroundColor Yellow
Write-Host ""
