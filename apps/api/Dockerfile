# Simple Dockerfile for the API service
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and prisma assets
COPY . .

# Prisma client (uses sqlite dev.db by default)
RUN npx prisma generate

ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL=file:./prisma/dev.db

EXPOSE 4000

CMD ["npm", "run", "dev:api"]
