FROM node:18-alpine
LABEL maintainer="vnagibin@leantech.ai"
WORKDIR /app
COPY ./ /app
RUN npm install
COPY . .
CMD ["node","src/index.js"]
