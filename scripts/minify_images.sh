#!/bin/bash

##
  # Minify all new images in the root dir
#

current_path=$PWD

cd /var/services/homes/patrick/Images/express/dist/scrapers

node ./compressImages.js

cd $current_path
