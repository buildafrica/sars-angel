FROM node:13.12.0-alpine


WORKDIR /workspace
COPY package.json yarn.lock /workspace/

RUN yarn install

COPY . .

RUN yarn build

## build production app
EXPOSE 4000
ENV NODE_ENV production

# CMD ["node", "dist/main"]
CMD ["yarn", "run", "start"]