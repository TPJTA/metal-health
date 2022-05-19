FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add cross-env
COPY . .
RUN yarn build
CMD yarn prod
EXPOSE 3012