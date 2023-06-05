#!/bin/bash

echo "Server"
echo "================================"
cd server
./gradlew build
echo "running build"
./gradlew bootRun