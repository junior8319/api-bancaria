# backend/Dockerfile
FROM alpine:3.2

ENV NODE_VERSION 22.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
