FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run next:export
RUN npm run tsc:build

EXPOSE 8080

CMD ["npm", "run", "pm2:prod"]
