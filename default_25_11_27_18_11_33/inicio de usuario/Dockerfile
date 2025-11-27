FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production

EXPOSE 4000

CMD ["npm", "start"]
