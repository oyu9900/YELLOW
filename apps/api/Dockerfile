FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .



# Install OpenSSL 1.1
RUN apt-get update && apt-get install -y openssl && \
    ln -s /usr/lib/x86_64-linux-gnu/libssl.so.1.1 /usr/lib/x86_64-linux-gnu/libssl.so.1.1 || true

RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "run", "dev:api"]
