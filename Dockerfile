FROM node:lts

WORKDIR /gostudy_app
COPY frontend/Frontend-React-App/package*.json ./frontend/Frontend-React-App/
COPY backend/package*.json ./backend/

RUN cd frontend/Frontend-React-App && npm install --omit=dev
RUN cd backend && npm install --omit=dev

# NON PROD: RUN npm install

COPY . .

EXPOSE 3001 
CMD [ "node", "backend/routes.js" ]