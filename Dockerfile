FROM node:16.15-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=optional && npm cache clean --force

COPY --chown=node:node . .

CMD ["npm", "run" ,"start:dev"]