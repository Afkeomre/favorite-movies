# 🎬 Favorite Movies App

A responsive Vue 3 web application for managing a personal collection of favorite movies.  
Users can register, log in, search for movies via TMDB, and create their own collection with ratings and reviews.

## 🌐 Website

You can watch the website online [here](https://favorite-movies-pi.vercel.app).

## 🚀 Features

- 🔐 **Authentication & Authorization** via Firebase Auth (REST API)
- 📁 **Personal Movie Collections** stored in Firebase Realtime Database
- 🔍 **Search & Filtering** by title, rating, and release year
- ✍️ **User Reviews & Ratings** for each movie
- 🔄 **Real-time Editing** of personal collections
- 👨‍💻 Two pre-made test users for quick access & experimentation

> ⚠️ **Authorization is required** to access core functionality.

> ⚠️ **The Movie Database may be blocked** in your region. If that happens, the website will notify you. Using a VPN is a simple way to solve this issue.

## 🛠️ Tech Stack

- **Vue 3** + **Vue Router**
- **Vite** for fast development and builds
- **Pinia** for state management
- **Axios** for API communication
- **SCSS** + **Bootstrap** for responsive UI
- **VeeValidate** + **Yup** for form validation
- **TMDB API** for movie data
- **Firebase Authentication** via REST API for secure user login and registration
- **Firebase Realtime Database** for collections storage

## 👨‍💻 Test Users

You can log in with either of these accounts to explore functionality:

- **User 1**  
  Email: `test@mail.ru`  
  Password: `123456`

- **User 2**  
  Email: `test2@mail.ru`  
  Password: `1234567`

Or register your own account to create a personal collection.

## 📎 Project Highlights

- Clean and scalable codebase with separation of concerns
- Full CRUD for movies tied to user authentication
- Real-time data synchronization
- Mobile-first responsive layout
- Custom form validation & error handling
- Logout UI update and route protection

---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
