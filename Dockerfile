FROM node:15.12.0-alpine3.13

COPY dist /app

COPY techqila.crt /app

COPY techqila.key /app

COPY package.json /app

COPY firebase-key.json /app

WORKDIR app

RUN npm install --production

ENTRYPOINT ["node", "main.js"]
