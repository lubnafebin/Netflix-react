import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;
const imgUrl = import.meta.env.VITE_IMG_URL;
import axios from "../../axios";
import "./Banner.css";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [movie, setMovie] = useState();
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const intervalId = setInterval(() => {
        const index = Math.floor(Math.random() * movies.length);
        setMovie(movies[index]);
      }, 7000);
      return () => clearInterval(intervalId);
    }
  }, [movies]);

  const handlePlayClick = () => {
    if (!movie) return;
    axios
      .get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const videos = response.data.results;
        if (videos.length > 0) {
          setTrailer(videos[0]);
        } else {
          console.log("Trailer not available");
        }
      });
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url(${imgUrl + movie.backdrop_path})`
          : "none",
      }}
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title || movie.name : ""}</h1>
        <div className="banner_buttons">
          <button className="button" onClick={handlePlayClick}>
            Play
          </button>
          <button
            className="button"
            onClick={() => navigate(`/details/${movie.media_type}/${movie.id}`)}
          >
            Details
          </button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade">
        {trailer && (
          <div className="trailerOverlay" onClick={() => setTrailer(null)}>
            <div className="trailer" onClick={(e) => e.stopPropagation()}>
              <YouTube
                videoId={trailer.key}
                opts={{
                  height: "390",
                  width: "100%",
                  playerVars: { autoplay: 1 },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;
