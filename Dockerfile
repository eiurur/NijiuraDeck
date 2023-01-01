FROM node:16

WORKDIR /var/www/myapp


# Copy the package.json to workdir
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN cd backend && npm cache clean -f && npm install
RUN cd frontend && npm cache clean -f && npm install

# Copy application source
COPY . .

EXPOSE 8080

RUN cd frontend && npm run build

CMD cd backend && npm start