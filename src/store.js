// store.js

import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './components/slices/MoviesSlicer'; // Імпортуйте ваш редюсер

const store = configureStore({
  reducer: {
    movies: moviesReducer // Додайте ваш редюсер у об'єкт редюсерів
  }
});

export default store;
