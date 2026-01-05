import { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useNavigate, useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_API_KEY;
const IMG_URL = import.meta.env.VITE_IMG_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        let res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

        if (res.status === 404) {
          res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
        }
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <h2 style={{ color: "white" }}>Loading...</h2>;
  if (!movie) return <h2 style={{ color: "white" }}>Not Found</h2>;

  return (
    <div
      className="details"
      style={{
        backgroundImage: `url(${IMG_URL}${movie.backdrop_path})`,
      }}
    >
      <div className="details-content">
        <button onClick={() => navigate(-1)}>⬅ Back</button>

        <h1>{movie.title || movie.name}</h1>

        <p className="overview">{movie.overview}</p>

        <span>⭐ {movie.vote_average}</span>

        <h3>Release</h3>
        <p>{movie.release_date || movie.first_air_date}</p>

        <h3>Genres</h3>
        <p>{movie.genres?.map((g) => g.name).join(", ")}</p>
      </div>
    </div>
  );
};
