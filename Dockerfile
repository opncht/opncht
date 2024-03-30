FROM node:20-bullseye

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

RUN npm rebuild

COPY --chown=node:node . .

EXPOSE 3030

RUN yarn prisma generate


CMD ["yarn", "start"]
