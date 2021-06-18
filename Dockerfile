FROM node:14
WORKDIR /usr/src/shopping_cart
COPY package*.json ./
RUN npm build
COPY . .
EXPOSE 8080
CMD [ "npx","ui5","serve","-o","index.html" ]
