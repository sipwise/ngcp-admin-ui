#!/bin/bash

docker container kill "$(docker ps -a -q --filter='name=ngcp-admin-ui')" 2> /dev/null || true
