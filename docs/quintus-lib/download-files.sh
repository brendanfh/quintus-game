#!/bin/bash
FILES="quintus quintus_2d quintus_anim quintus_audio quintus_input quintus_scenes quintus_sprites quintus_tmx quintus_touch quintus_ui"
FILES_ARR=$(echo $FILES | tr " " "\n")

for f in $FILES_ARR
do
    curl -o $f.js https://raw.githubusercontent.com/cykod/Quintus/master/lib/$f.js
done