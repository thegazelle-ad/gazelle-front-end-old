#!/bin/bash

# Starts the code
# Mounts this directory inside the image

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PORT=${PORT:-3000}

docker run -i -t --rm \
  -p $PORT:3000 \
  --name isomorphic-flow-starter \
  -v $DIR/../:/srv/isomorphic-flow-starter/ isomorphic-flow-starter
