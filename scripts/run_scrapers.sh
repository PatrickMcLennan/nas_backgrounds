#!/bin/bash

##
  # Run all scrapers
#

current_path=$(pwd)

cd ~/

node ~/var/services/homes/patrick/Backgrounds/express/dist/scrapers/alphacoders.js
node ~/var/services/homes/patrick/Backgrounds/express/dist/scrapers/wallhaven.js
node ~/var/services/homes/patrick/Backgrounds/express/dist/scrapers/wallpaper_play.js
node ~/var/services/homes/patrick/Backgrounds/express/dist/scrapers/widescreen_wallpaper.js

cd current_path
