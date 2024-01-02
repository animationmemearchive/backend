FROM node:lts-alpine

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yml ./

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]