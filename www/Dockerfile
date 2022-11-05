FROM node:alpine AS builder

WORKDIR /app

RUN \
    npm i -g turbo
COPY . .
RUN turbo prune --scope=www --docker




FROM node:alpine AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN \
    npm ci
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json
RUN \
    npm run build:www




FROM nginx:stable-alpine AS runner

WORKDIR /app

RUN rm /etc/nginx/conf.d/default.conf
COPY ./www/nginx.conf /etc/nginx/conf.d


RUN addgroup --system --gid 1001 nginx
RUN adduser --system --uid 1001 nginx

USER nginx

COPY --from=installer /app .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
