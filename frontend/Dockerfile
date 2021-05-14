FROM node:14-alpine

WORKDIR /usr/frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production

ENV API_URL=https://api.mercari.krizzabullecer.dev

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
