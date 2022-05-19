FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn global add cross-env
RUN yarn build
CMD yarn prod
EXPOSE 3012