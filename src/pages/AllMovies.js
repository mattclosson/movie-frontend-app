import React from "react"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
const AllMovies = (props) => {
    const [searchInput, setSearchInput] = useState('');

    const listofMovies = props.movies.map((movie) => <Link to={`/${movie.id}`} key={movie.id} className="movie-container">
            <img src={movie.poster} alt={movie.title} className="movie-img" />
            <h1>{movie.title}</h1>
        </Link>
    )

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
                    return <div className="overlay"><Link to={`/${movie.id}`} key={movie.id} className="movie-container">
                            <img src={movie.poster} alt={movie.title} className="movie-img" />
                            <h1>{movie.title}</h1>
                        </Link>
                    </div>
                })}
            </div>
        </>
    )
}

export default AllMovies;