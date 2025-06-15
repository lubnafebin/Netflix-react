import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "./RowPost.css";
import PropTypes from "prop-types";
import { imgUrl, API_KEY } from "../../constants/Constants";
import axios from "../../axios";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState(null);
  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log("Not available");
        }
      });
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id}
            onClick={() => handleMovie(obj.id)}
            alt="poster"
            className={props.isSmall ? "smallPoster" : "poster"}
            src={
              obj.backdrop_path || obj.poster_path
                ? `${imgUrl}${
                    props.isSmall ? obj.poster_path : obj.backdrop_path
                  }`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
          />
        ))}
      </div>
      {urlId && (
        <div className="trailerOverlay" onClick={() => setUrlId(null)}>
          <div className="trailer" onClick={(e) => e.stopPropagation()}>
            <Youtube opts={opts} videoId={urlId.key} />
          </div>
        </div>
      )}
    </div>
  );
}
RowPost.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  isSmall: PropTypes.bool,
};

export default RowPost;
