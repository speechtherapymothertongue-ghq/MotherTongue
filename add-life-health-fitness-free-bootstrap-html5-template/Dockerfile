FROM node:22-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY mothertongue-server/package*.json ./mothertongue-server/
RUN cd mothertongue-server && npm install

COPY . .

EXPOSE 8000

CMD ["nodemon", "--watch", "mothertongue-server", "mothertongue-server/server.js"]
