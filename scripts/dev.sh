#!/bin/bash

# Mounts this directory inside the image
# You might need to do npm install the first time / when deps change

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PORT=${PORT:-3000}

docker run -i -t --rm \
  -p $PORT:3000 \
  --name isomorphic-flux-starter \
  -v $DIR/../:/srv/isomorphic-flow-starter/ lingz/isomorphic-flux-starter
