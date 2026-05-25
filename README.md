# 🎬 Коллекция любимых фильмов

Адаптивное веб-приложение на Vue 3 для управления личной коллекцией фильмов.  
Пользователи могут регистрироваться, входить в систему, искать фильмы в TMDB и создавать свою собственную коллекцию с рейтингами и рецензиями.

## 🛠️ Стек технологий
![Vue.js](https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vue Router](https://img.shields.io/badge/Vue%20Router-42B883?style=for-the-badge&logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=000000)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vee Validate](https://img.shields.io/badge/Vee%20Validate-42b883?style=for-the-badge)
![Yup](https://img.shields.io/badge/Yup-A78BFA?style=for-the-badge)
![TMDB](https://img.shields.io/badge/TMDB-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

## 🌐 Демо

Вы можете посмотреть веб-сайт онлайн [здесь](https://favorite-movies-pi.vercel.app).

## 🚀 Особенности

- 📁 **Личные коллекции фильмов** 
- 🔍 **Поиск** внутри коллекции
- ↕️ **Сортировка** фильмов по названию, рейтингу и году выпуска 
- ✍️ **Рецензии пользователей и рейтинги** для каждого фильма
- 🔄 **Редактирование коллекций** 
- 👨‍💻 **Два тестовых пользователя** для быстрого доступа и экспериментов

> ⚠️ **Для доступа к основным функциям требуется авторизация**.

> ⚠️ **The Movie Database может быть заблокирована** в вашем регионе. В этом случае вы получите уведомление от веб-сайта. Использование VPN решит проблему.

## 👨‍💻 Тестовые пользователи

Вы можете войти в систему с любой из этих учетных записей, чтобы изучить функциональность:

- **Пользователь 1**  
  Email: `test@mail.ru`  
  Password: `123456`

- **Пользователь 2**  
  Email: `test2@mail.ru`  
  Password: `1234567`

Или зарегистрируйте свой аккаунт, чтобы создать личную коллекцию.

## 🔧 Реализация функционала

- Аутентификация и авторизация пользователей через Firebase REST API
- Полный CRUD для фильмов, привязанный к аутентификации пользователя
- Обновление данных в режиме реального времени с помощью Firebase Realtime Database
- Адаптивная верстка для мобильных устройств
- Валидация форм и обработка ошибок
- Обновление UI при выходе из системы и защита маршрута

---
## ⚙️ Запуск проекта
### Установка зависимостей:

```sh
npm install
```

### Запуск в режиме разработки:

```sh
npm run dev
```

### Сборка для продакшена:

```sh
npm run build
```
