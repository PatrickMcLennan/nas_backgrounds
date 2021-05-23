#!/bin/bash

##
  # Run `bash docker-teardown.sh` to blow away this image and container
#

docker stop wallpapers_container && docker container rm wallpapers_container && docker image rm wallpapers_node
