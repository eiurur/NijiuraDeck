FROM node:16

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

WORKDIR /var/www/myapp

# Copy the package.json to workdir
COPY lerna.json ./
COPY package.json ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/
RUN npm install

# Copy application source
COPY . .

EXPOSE 18721

RUN npm run build

CMD /wait && npm start