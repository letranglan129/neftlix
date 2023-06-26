FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN apk add --no-cache git \
    && npm install --frozen-lockfile \
    && npm cache clean --force  

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["yarn", "start"]
