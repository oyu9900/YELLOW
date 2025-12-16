FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json nx.json tsconfig.base.json ./
COPY libs ./libs
COPY apps/api ./apps/api

RUN npm install

EXPOSE 4000

CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "apps/api/src/index.ts"]
