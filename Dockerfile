ARG NODE_IMAGE=node:16-alpine

#Create base layer wich we'll be use later
FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init bash \
  yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

#Installing all dependencies of the our app
FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./yarn.lock ./
COPY --chown=node:node ./docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh
COPY --chown=node:node . .

#Build process
FROM dependencies AS build
RUN node ace build --production

#Crete production mod
FROM base AS production
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .

EXPOSE 3333
CMD [ "dumb-init", "node", "server.js" ]

