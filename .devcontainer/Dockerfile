# Use the latest LTS version of Node.js as the base image
FROM node:lts

# Install SQLite3
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev

# Set the working directory in the container
WORKDIR /workspace

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Command to run on container start
CMD [ "npm", "start" ]