# backend/Dockerfile
FROM node:22-alpine

WORKDIR /api-bancaria

COPY package*.json ./backend

RUN npm install

COPY . ./backend

EXPOSE 3001

CMD ["npm", "run", "dev"]
