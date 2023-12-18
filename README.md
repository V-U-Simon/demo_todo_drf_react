# Todo-Demo: DRF / React / JWT tokens

Пример backend & frontend для реализации todo-менеджера, с REST клиент-серверным взаимодейсвием.

Backend features: 
- авторизация пользователя с помощью JWT токенов;
- выделение django конфигурации в отдельный config-модуль;
- реализация todo-API;
- подключение swagger/redoc спецификации;
- возможность работы с GraphQL;

Frontend features:
- исопльзование zustand в качестве менеждера состояния;
- авторизация пользователя с помощью JWT токенов;
- реализация формы с помощью react-hook-form и валидацая данных полей формы с помощью ZOD при авторизации и регисрации;
- стандартная релазация форм при работе с моделями todo;
- автоматическая подстановка заголовков авторизации при исопльзовании api-клиента;
- обновление токена доступа при его истечении;
- использование TailWind CSS c DaisyUI;

![examples](./example.gif)

## 🚀 Quick start

Клонируйте этот проект на свой компьютер и запустите его с помощью следующих команд

```sh
# определяем наш файл с окружением
mv .env_example .env

# Запуск проекта
docker-compose up

# Остановка проекта
<Ctrl> + C
docker-compose down
```

## Используемые технологии

Backend:
- django
- django-rest-framework
- drf-yasg
- simple jwt
- etc.

Frontend:
- react
- zustand
- react-router-dom
- Tailwind
- DaisyUI
- clsx
- react-hook-form
- zod
- react-jwt
- axios

