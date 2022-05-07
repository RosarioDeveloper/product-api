#!/bin/bash
[ ! -f /.env ] && cp dockerConfig/env.txt .env
[ ! -f /.env ] && cp dockerConfig/env.txt .env.test
yarn
node ace migration:run
node ace db:seed
dumb-init node ace serve --watch --node-args="--inspect=0.0.0.0"


