# backend/Dockerfile
FROM node:18

RUN apt-get update && apt-get install -y python3 python3-pip build-essential

RUN apt install -y build-essential

RUN apt-get update && apt-get install -y lsof

WORKDIR /api-bancaria/backend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
