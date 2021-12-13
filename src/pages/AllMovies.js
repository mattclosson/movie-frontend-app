import React from "react"
import { Link } from "react-router-dom";
import { useState } from "react";

const AllMovies = (props) => {
    const [searchInput, setSearchInput] = useState('');

    const filterMovies = ({ title }) => {
        return title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
    }

    return (
        <>
            <input icon='search'
                placeholder='Search...'
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-bar"
            />
            <div className="movies">
                {props.movies.filter(filterMovies).map((movie)=> {
                    return <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-container">
                            <img src={movie.poster} alt={movie.title} className="movie-img" />
                            <h1>{movie.title}</h1>
                        </Link>
                })}
            </div>
        </>
    )
}

export default AllMovies;