# backend/Dockerfile
FROM node:22-alpine

WORKDIR /api-bancaria

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
