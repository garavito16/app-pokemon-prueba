FROM node:16.13.1-alpine3.14

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN yarn install --production

CMD [ "npm", "start" ]