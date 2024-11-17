import React, { useEffect, useState } from 'react'
import { API_KEY, imgUrl } from '../../constants/Constants'
import axios from '../../axios'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState()
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
            console.log(response.data.results[0]);
            setMovies(response.data.results);
        })
    }, []);
    useEffect(() => {
        const setBanner =()=>{
            const index = Math.floor(Math.random() * 20);
            setMovie(movies[index])            
        }
        if(movies.length>0){
            setBanner();
            window.setInterval(setBanner, 5000);
        }
     }, [movies])
    return (
        <div
            style={{ backgroundImage: movie?.backdrop_path ? `url(${imgUrl + movie.backdrop_path})` : "none" }}>
            <div className='banner'>
                <div className='content'>
                    <h1 className='title'>{movie ? movie.title : ""}</h1>
                    <div className='banner_buttons'>
                        <button className='button'>Play</button>
                        <button className='button'>My list</button>
                    </div>
                    <h1 className='description'>{movie ? movie.overview : ""}</h1>
                </div>
                <div className="fade">
                </div>
            </div>
        </div>
    )
}

export default Banner   
