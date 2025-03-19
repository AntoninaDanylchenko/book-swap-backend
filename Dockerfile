# Використовуємо офіційний образ Node.js
FROM node:18

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проєкту в контейнер
COPY . .

# Відкриваємо порт (той самий, що в Nest.js)
EXPOSE 3333

# Запускаємо сервер
CMD ["npm", "run", "start"]
