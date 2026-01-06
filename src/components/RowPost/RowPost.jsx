import { useEffect, useState } from "react";
import "./RowPost.css";
import PropTypes from "prop-types";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
const imgUrl = import.meta.env.VITE_IMG_URL;

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id}
            onClick={() => navigate(`details/${obj.media_type}/${obj.id}`)}
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
    </div>
  );
}
RowPost.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  isSmall: PropTypes.bool,
};

export default RowPost;
