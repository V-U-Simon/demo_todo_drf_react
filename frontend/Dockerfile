# Указываем базовый образ
FROM nginx:alpine
# FROM nginx:latest

# Копируем собранный проект в папку для статических файлов nginx
COPY ./dist /var/www

# Задаем команду для запуска приложения
CMD ["nginx", "-g", "daemon off;"]