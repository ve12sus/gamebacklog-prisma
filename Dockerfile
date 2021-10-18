# specify the node base image with your desired version node:<version>
FROM node:12.13.1

ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "./"]
COPY prisma ./prisma/

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "build/app.js" ]