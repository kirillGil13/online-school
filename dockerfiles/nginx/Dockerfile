FROM node:12 as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn global add @vue/cli @vue/cli-service
RUN yarn
COPY ./ .
RUN yarn run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY dockerfiles/nginx/nginx.conf /etc/nginx/nginx.conf
