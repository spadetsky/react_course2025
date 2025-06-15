# React Movie Search App

This is a movie search and discovery app built with React. It allows users to search for movies via the TMDB API and view trending movies stored in an Appwrite backend. This project was built by following the course [Build an App & Master React in 2 Hours! (React 19)](https://jsm.dev) by JavaScript Mastery.

---

## 🎥 App Demo

### Desktop Experience

![Desktop Screenshot](public/app%20screenshots/desktop_ss.png)

![Recording Desktop](public/app%20screenshots/Recoding_Desktop.gif)

### Mobile View

![Mobile Recording](public/app%20screenshots/Recoding_Mobile.gif)

### Tablet Layout

![Tablet Screenshot](public/app%20screenshots/tablet_ss.png)

---

## 📊 Feature Screens

- **Search in Action**

  ![Searching Screenshot](public/app%20screenshots/searching_ss.png)

- **Trending Metrics (Appwrite)**

  ![Metrics Screenshot](public/app%20screenshots/metrics_ss.png)

---

## 🔧 Tech Stack

- **React 19** 
- **Vite** 
- **TMDB API** (movie data)
- **Appwrite** (backend database for search analytics)
- **Tailwind CSS** 
- **react-use** (for debounced input handling)

---

## 📚 Core course learning points


- Setting up a React project with Vite and environment variables
- Using `useState`, `useEffect`, and `useDebounce` effectively
- Fetching and displaying movie data from TMDB
- Integrating with Appwrite to create and update documents
- Managing multiple loading and error states in the UI
- Structuring reusable components and handling conditional rendering cleanly

---

## ✨ Features

- **Movie Search**: Type a movie title and get instant results (with debouncing)
- **Trending Movies**: View a curated list of trending titles, pulled from Appwrite
- **Search Analytics**: Search frequency is tracked and updated using Appwrite
- **Loading and Error Handling**: Smooth UX with spinners and error messages
- **Clean UI Components**: Includes `Search`, `Spinner`, and `MovieCard`

---
