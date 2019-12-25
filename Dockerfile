FROM node:11.7.0-alpine

RUN npm install -g http-server && \
    npm install -g @vue/cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]
