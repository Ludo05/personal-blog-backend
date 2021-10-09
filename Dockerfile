FROM node:14.17.1 as base
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./src ./
COPY tsconfig.json ./tsconfig.json

RUN yarn build
EXPOSE 5000
CMD [ "node", "dist/server.js" ]
