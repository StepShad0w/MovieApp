import{v4 as uuidv4} from'uuid'

const  movieWithId=(movie,source)=> {
  return {
   ...movie,
   source,
   isFavorite:false,
   id:movie.id
  }
}
export default movieWithId;


export const API_KEY = "ec16966d6d7b050d0f3a7aa80afc4b41";

export const BASE_URL = 'https://api.themoviedb.org/3/';