FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN bash -c ". .nvm/nvm.sh \ 
            && nvm install && nvm use"
RUN npm install
RUN npm run tsc:build
RUN npm run pm2:prod
RUN npm run next:export

EXPOSE 8080

# CMD ["npm", "run", "pm2:prod"]
