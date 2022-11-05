FROM node:16-alpine
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build
EXPOSE 8083
ENTRYPOINT npm run start