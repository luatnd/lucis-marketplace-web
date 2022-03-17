# Build BASE
FROM node:16-alpine3.15 as BASE
LABEL author="ductnn"

WORKDIR /anim
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn install --frozen-lockfile \
    && yarn cache clean \
    && apk del git


# Build Image
FROM node:16-alpine3.15 AS BUILD
LABEL author="ductnn"

WORKDIR /anim
COPY --from=BASE /anim/node_modules ./node_modules
COPY . .
RUN apk add --no-cache git curl \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline \
    && curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin \
    && node-prune \
    && rm -rf /usr/local/bin/node-prune \
    && apk del git curl


# Build production
FROM node:16-alpine3.15 AS PRODUCTION
LABEL author="ductnn"

WORKDIR /anim
COPY --from=BUILD /anim/package.json /anim/yarn.lock ./
COPY --from=BUILD /anim/node_modules ./node_modules
COPY --from=BUILD /anim/.next ./.next
COPY --from=BUILD /anim/public ./public
COPY --from=BUILD /anim/next.config.js ./

EXPOSE 3000

CMD ["yarn", "start"]
