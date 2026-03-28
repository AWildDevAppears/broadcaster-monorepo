FROM node:20-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

COPY package.json ./
RUN pnpm install

COPY . .

FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

EXPOSE 3000

CMD ["node", "--loader", "ts-node/esm", "src/main.ts"]
