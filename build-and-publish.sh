rm -rf dist \
 && ng build dyngo-lib \
 && cd dist/dyngo-lib \
 && npm publish --tag beta
