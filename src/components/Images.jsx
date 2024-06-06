import React from 'react'

export default function Images() {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const movieId = location.state?.movieId;
  
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ec16966d6d7b050d0f3a7aa80afc4b41`);
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
  
    const getImage = async (id) => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=ec16966d6d7b050d0f3a7aa80afc4b41&language=en-US`);
        const data = await response.json();
        if (data.results.length > 0) {
          // Assume the first video is the selected one
          setSelectedVideo(data.results[0]);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    
  
    useEffect(() => {
      if (movieId) {
        fetchMovieData();
        getImage(movieId);
      }
    }, [movieId]);

  return (
    <div>Images</div>
    
    
  )
}
