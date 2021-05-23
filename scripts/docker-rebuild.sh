#!/bin/bash

##
  # Run `bash docker-rebuild.sh` to blow away this image and container
#

docker build -t wallpapers_node ../ && docker run -d -p 49160:80 --name wallpapers_container wallpapers_node
