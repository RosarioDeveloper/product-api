#!/bin/bash
[ ! -f /.env ] && cp dockerConfig/env.txt .env
[ ! -f /.env ] && cp dockerConfig/env.txt .env.test
yarn
dumb-init node ace serve --watch --node-args="--inspect=0.0.0.0"
node ace migration:run
node ace db:seed


