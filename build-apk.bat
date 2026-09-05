@echo off
echo ========================================================
echo Building AutoTracker Android APK...
echo ========================================================

if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Android\Android Studio\jbr" (
        set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
    ) else if exist "C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot" (
        set "JAVA_HOME=C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot"
    )
)

if "%ANDROID_HOME%"=="" (
    set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
)

echo Using JAVA_HOME: %JAVA_HOME%
echo Using ANDROID_HOME: %ANDROID_HOME%

echo 1. Installing dependencies if needed...
if not exist node_modules (
    call npm install
)

echo 2. Building frontend web assets...
call npm run build
if %errorlevel% neq 0 (
    echo Error during npm run build
    pause
    exit /b %errorlevel%
)

echo 3. Syncing Capacitor Android project...
call npx cap sync android
if %errorlevel% neq 0 (
    echo Error during cap sync
    pause
    exit /b %errorlevel%
)

echo 4. Assembling APK via Gradle...
cd android
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo Error during Gradle assembleDebug
    cd ..
    pause
    exit /b %errorlevel%
)
cd ..

echo 5. Copying APK to root...
copy /Y "android\app\build\outputs\apk\debug\app-debug.apk" "AutoTracker-debug.apk"

echo ========================================================
echo SUCCESS: AutoTracker-debug.apk is ready!
echo ========================================================
pause
