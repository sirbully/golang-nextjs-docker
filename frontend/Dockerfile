FROM node:14-alpine

WORKDIR /usr/frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
