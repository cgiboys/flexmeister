#!/bin/bash

echo "Server"
echo "================================"
cd server
./gradlew build
echo "running build"
./gradlew bootRun &

echo "================================"
cd ../client
echo "runing Client"
npm install
node src/main.js &
