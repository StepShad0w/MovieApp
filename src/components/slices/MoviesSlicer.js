import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  trendingMovies: [],
  popularMovies:[],
  upcoming:[],
  trailerById: {},
  movieById: {},
  status: 'idle',
  error: null
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await axios.get(`${BASE_URL}discover/movie?api_key=${API_KEY}`);
    return response.data.results;
  }
);
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async () => {
    const response = await axios.get(`${BASE_URL}movie/top_rated?api_key=${API_KEY}`);
    return response.data.results;
  }
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


const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    
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

      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })

      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
      })

      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.trailerById = action.payload;
      });
  },
});

export const { toggleFavorite } = movieSlice.actions;

export const selectMovies = (state) => state.movies.movies;
export const selectTrailerById = (state) => state.movies.trailerById;
export const selectPopularMovies = (state) => state.movies.popularMovies;
export const selectUpcomingMovies = (state)=> state.movies.upcoming

export default movieSlice.reducer;
