#!/bin/bash

WILDFLY_PATH="$(pwd)/wildfly-preview-34.0.0.Beta1"
DEPLOY_PATH="$(pwd)/client/build/libs/client.war"

if ./gradlew build; then
    echo "Deploing..."
    $WILDFLY_PATH/bin/jboss-cli.sh --connect --commands="deploy --force $DEPLOY_PATH"
    echo "Done!"
    echo "Starting server..."
    ./gradlew bootRun
    exit 0  
fi