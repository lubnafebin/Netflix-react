import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        let type = "movie";

        let res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );

        if (res.status === 404) {
          type = "tv";
          res = await fetch(
            `${BASE_URL}/tv/${id}?api_key=${API_KEY}`
          );
        }

        const data = await res.json();
        setMovie(data);

        // Fetch cast
        const castRes = await fetch(
          `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`
        );
        const castData = await castRes.json();
        setCast(castData.cast?.slice(0, 12) || []);

        // Fetch trailer
        const videoRes = await fetch(
          `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
        );
        const videoData = await videoRes.json();

        const trailerVideo = videoData.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(trailerVideo?.key);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return null;

  return (
    <div
      className="details-bg"
      style={{
        backgroundImage: `url(${IMG_URL}${movie.backdrop_path})`,
      }}
    >
      <div className="details-overlay">
        <div className="details-container">
          {/* LEFT */}
          <div className="details-poster">
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>

          {/* RIGHT */}
          <div className="details-info">
            <h1>{movie.title || movie.name}</h1>

            <div className="meta">
              <span>{movie.release_date || movie.first_air_date}</span>
              <span>
                {movie.genres?.map((g) => g.name).join(", ")}
              </span>
              {movie.runtime && <span>{movie.runtime} min</span>}
            </div>

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer}`}
                target="_blank"
                rel="noreferrer"
                className="play-btn"
              >
                ▶ Play Trailer
              </a>
            )}

            <p className="overview">{movie.overview}</p>

            <div className="rating">
              ⭐ {movie.vote_average?.toFixed(1)} / 10
            </div>
          </div>
        </div>

        {/* CAST */}
        <div className="cast-section">
          <h2>Cast</h2>
          <div className="cast-row">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-card">
                <img
                  src={
                    actor.profile_path
                      ? `${IMG_URL}${actor.profile_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={actor.name}
                />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
