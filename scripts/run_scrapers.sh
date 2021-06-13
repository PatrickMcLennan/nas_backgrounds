#!/bin/bash

##
  # Run all scrapers
#

current_path=$PWD

cd /var/services/homes/patrick/Images/express/dist/scrapers

node ./alphacoders.js
node ./wallhaven.js
node ./wallpaper_play.js
node ./widescreen_wallpaper.js

cd $current_path
