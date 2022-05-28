FROM node:14.18-alpine3.14

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

COPY ./build ./build

CMD ["npm", "run", "start:prod"]