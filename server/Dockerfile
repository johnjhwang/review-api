FROM node:latest

WORKDIR /review-api

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server/index.js" ]