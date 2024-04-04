FROM node:20.10.0-bullseye

RUN mkdir -p /usr/src/opncht-server && chown -R node:node /usr/src/opncht-server

WORKDIR /usr/src/opncht-server

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

RUN npm rebuild

COPY --chown=node:node . .

EXPOSE 3030

RUN yarn prisma generate


CMD ["yarn", "start"]
