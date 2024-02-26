FROM node:20-alpine

WORKDIR /frontned

COPY package*.json .
# COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]