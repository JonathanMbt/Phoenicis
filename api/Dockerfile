FROM node:alpine AS builder

WORKDIR /app

RUN \
    npm i -g turbo
COPY . .
RUN turbo prune --scope=api --docker




FROM node:alpine AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN \
    npm ci
COPY --from=builder /app/out/full .
COPY turbo.json turbo.json
RUN \
    npm run build:api




FROM node:alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 node
RUN adduser --system --uid 1001 node

USER node

COPY --from=installer /app .

WORKDIR /app/api/dist

RUN \
    npm ci --production

CMD ["node", "server.js"]
