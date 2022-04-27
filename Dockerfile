ARG NODE_IMAGE=node:16-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init

#Create app folder and set user permission to folder
RUN mkdir -p /home/node/product_api && chown node:node /home/node/product_api

WORKDIR /home/node/product_api/
USER node
RUN mkdir tmp

#copying package.json, package.lock.json, yarn.lock
FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./yarn.lock ./
COPY --chown=node:node . .

#Bulding project
FROM dependencies AS build
RUN node ace build --production

#Production Mode
FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0

COPY --chown=node:node ./package*.json ./
RUN npm ci --production

COPY --chown=node:node --from=build /home/node/product_api/build .

#Instaling yarn and install dependencies
RUN npm i -g yarn && yarn


EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
