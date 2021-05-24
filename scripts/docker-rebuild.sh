#!/bin/bash

##
  # Run `bash docker-rebuild.sh` to rebuild this container with its images
#

docker build -t wallpapers_node ../ && docker run -d -p 49160:80 --name wallpapers_container wallpapers_node
