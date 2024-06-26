import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../utils/constants";

const loadFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

const initialState = {
  movies: [],
  trendingMovies: [],
  popularMovies: [],
  similarMovies:[],
  upcoming: [],
  imagesById: [],
  trailerById: {},
  movieById: {},
  personById:{},
  favorites: loadFavorites(),
  filteredAllMovies: [],
  search:[],
  filteredMovies: [],
  filteredPeople: [],
  personImagesById: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async () => {
    const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const fetchImagesById = createAsyncThunk(
  'movies/fetchImagesById',
  async (id) => {
    try {
      console.log("Calling fetchPersonImagesById with ID:", id);
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`);
      console.log("fetchPersonImagesById response:", response.data.backdrops);
      return response.data.backdrops.length > 0 ? response.data.backdrops : [];
    } catch (error) {
      console.error("Error fetching person images by ID:", error);
      throw error;
    }}
);


export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async () => {
    const response = await axios.get(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const response = await axios.get(`${BASE_URL}movie/popular?api_key=${API_KEY}`);
    return response.data.results;
  }
);

export const fetchVideo = createAsyncThunk(
  'movies/fetchVideo',
  async (id) => {
    const response = await axios.get(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`);
    return response.data.results.length > 0 ? response.data.results[0] : null;
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
    return response.data;
  }
);

export const fetchSimilar = createAsyncThunk(
  'movies/fetchSimilar',
  async (id) => {
    const response = await axios.get(`${BASE_URL}movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=${1}`);
    return response.data.results;
  }
);

export const fetchPersonById = createAsyncThunk('movies/fetchPersonById', async (id) => {
  const response = await axios.get(`${BASE_URL}person/${id}?api_key=${API_KEY}`);
  
  return response.data;
});

export const fetchSearch = createAsyncThunk(
  'movies/fetchSearch',
  async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${1}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  }
);
export const fetchSearchPeople = createAsyncThunk(
  'movies/fetchSearchPeople',
  async (query) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`);
    return response.data.results;
  }
);

export const fetchPersonImagesById = createAsyncThunk('movies/fetchPersonImagesById', async (id) => {
  try {
    console.log("Calling fetchPersonImagesById with ID:", id);
    const response = await axios.get(`https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`);
    console.log("fetchPersonImagesById response:", response.data);
    return response.data.profiles.length > 0 ? response.data.profiles : [];
  } catch (error) {
    console.error("Error fetching person images by ID:", error);
    throw error;
  }
});


const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const existingIndex = state.favorites.findIndex((fav) => fav.id === movie.id);

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(movie);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trendingMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movieById = action.payload;
      })
      .addCase(fetchImagesById.fulfilled, (state, action) => {
        state.imagesById = action.payload;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similarMovies = action.payload;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.trailerById = action.payload;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.search = action.payload;
      })
      .addCase(fetchSearchPeople.fulfilled, (state, action) => {
        state.filteredPeople = action.payload;
      })
      .addCase(fetchPersonById.fulfilled, (state, action) => {
        state.personById = action.payload;
      })
      .addCase(fetchPersonImagesById.fulfilled, (state, action) => {
        state.personImagesById = action.payload;
      });
  },
});

export const { toggleFavorite, } = movieSlice.actions;
export const selectMovies = (state) => state.movies.movies;
export const selectFilteredMovies = (state) => state.movies.search;
export const selectTrailerById = (state) => state.movies.trailerById;
export const selectPopularMovies = (state) => state.movies.popularMovies;
export const selectUpcomingMovies = (state) => state.movies.upcoming;
export const selectFavorites = (state) => state.movies.favorites;
export const selectFilteredPeople = (state) => state.movies.filteredPeople;
export const selectPersonById = (state) => state.movies.personById;
export const selectPersonImagesById = (state) => state.movies.personImagesById;
export const selectMoviesImagesById = (state)=> state.movie.imagesById;
export const selectSimilarMovies = (state)=> state.movie.similarMovies;
export default movieSlice.reducer;
