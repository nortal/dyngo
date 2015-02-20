#!/bin/sh
gulp build \
 && pushd demo && npm install && bower install \
 && cp ../dist/dyngo.js app/bower_components/dyngo/dist/ \
 && grunt serve
