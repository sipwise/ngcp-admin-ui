#!/bin/bash

BASEDIR=$(dirname "$0")
DOCKER_IMAGE="docker.mgm.sipwise.com/ngcp-admin-ui-buster:$1"

cd "$BASEDIR/.." || exit 1
docker pull "$DOCKER_IMAGE"
docker run --rm -p 8080:8080 -i -t -v $(pwd):/code:rw "$DOCKER_IMAGE" t/run_admin_ui "$2"
