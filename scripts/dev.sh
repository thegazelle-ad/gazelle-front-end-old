#!/bin/bash

# Mounts this directory inside the image
# You might need to do npm install the first time / when deps change

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PORT=${PORT:-3000}

docker run -i -t --rm \
  -p $PORT:3000 \
  --name gazelle-front-end \
  -v $DIR/../:/srv/gazelle-front-end/ thegazelle/gazelle-front-end
