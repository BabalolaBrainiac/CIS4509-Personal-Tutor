
FROM node:16

LABEL authors="opeyemibabalola"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run start


CMD [ "npm", "run", "start" ]

#ENTRYPOINT ["top", "-b"]