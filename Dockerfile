FROM node:14.18-alpine3.14

COPY . .

COPY package*.json ./

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]