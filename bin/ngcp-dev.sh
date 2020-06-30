#!/bin/bash

BASEDIR=$(dirname "$0")

"$BASEDIR/ngcp-dev-config.sh"
"$BASEDIR/start-dev-server.sh" "$1" "ngcp"
