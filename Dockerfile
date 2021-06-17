FROM node:14
WORKDIR /usr/src/shopping_cart
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "mockserver.js" ]
