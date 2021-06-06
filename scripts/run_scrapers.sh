#!/bin/bash

##
  # Run all scrapers
#

current_path=$PWD

echo $current_path

cd /var/services/homes/patrick/Backgrounds

echo $PWD

node ./express/dist/scrapers/alphacoders.js
node ./express/dist/scrapers/wallhaven.js
node ./express/dist/scrapers/wallpaper_play.js
node ./express/dist/scrapers/widescreen_wallpaper.js

cd $current_path
