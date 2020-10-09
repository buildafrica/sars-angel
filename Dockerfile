FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install && npm build
# If you are building your code for production
RUN npm run test --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "./dist/entry.js" ]