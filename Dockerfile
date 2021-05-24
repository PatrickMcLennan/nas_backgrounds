FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN apt-get update
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

RUN bash -c ". .nvm/nvm.sh \ 
            && nvm install && nvm use \
            && npm install \
            && npm run tsc:build \
            && npm run pm2:prod \
            && npm run next:export"
# RUN npm install
# RUN npm run tsc:build
# RUN npm run pm2:prod
# RUN npm run next:export

EXPOSE 8080

# CMD ["npm", "run", "pm2:prod"]
