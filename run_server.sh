#!/bin/bash

if ./gradlew build; then
    echo "Starting server..."
    ./gradlew bootRun
    exit 0  
fi