FROM node:22-alpine

# Set working directory
WORKDIR /app/mothertongue-server

# Install nodemon globally
RUN npm install -g nodemon

# Copy package files first to use cache
COPY mothertongue-server/package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server code
COPY mothertongue-server/ ./

# Expose API port
EXPOSE 8000

# Start with nodemon
CMD ["nodemon", "--watch", ".", "server.js"]
