FROM node:gallium-alpine3.16 AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN \
    npm i -g turbo
COPY ./build .
RUN turbo prune --scope=www --docker




FROM node:gallium-alpine3.16 AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY ./build/turbo.json turbo.json
RUN \
    npm i
COPY --from=builder /app/out/full .
RUN \
    npm run build:www




FROM nginx:stable-alpine AS runner

WORKDIR /app

RUN rm /etc/nginx/conf.d/default.conf
COPY ./build/www/nginx.conf /etc/nginx/conf.d

COPY --from=installer /app .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
