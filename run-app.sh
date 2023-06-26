#!/bin/bash

echo "App"
echo "================================"
cd app
echo "Cleaning app cache"
flutter clean
echo "Re-install packages"
flutter pub get
echo "Running app"
flutter run