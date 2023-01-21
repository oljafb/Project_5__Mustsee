import React from 'react';
import {useSelector} from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

function Movies() {
    let movies = useSelector(store => store.movies);
    if (movies.length>0){      
    };  
           return ( 
            <ul className="movies">
                {movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>                        
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    
}
 
export default Movies;