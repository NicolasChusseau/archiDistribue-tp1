# syntax=docker/dockerfile:1

FROM node:22.11.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:ts
RUN npm prune --production


FROM node:22.11.0
WORKDIR /app
COPY --from=0 /app /app

RUN npm install -g fastify-cli

CMD ["fastify", "start", "-l", "info", "dist/app.js"]

EXPOSE 8080
