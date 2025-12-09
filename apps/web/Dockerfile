# Simple production Dockerfile for Next.js app
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the web app
RUN npm run build

# Expose the web port
EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
