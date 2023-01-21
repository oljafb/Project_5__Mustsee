import React from 'react';
import './MovieItem.css';
import{useDispatch} from 'react-redux';

function MovieItem({Title, Year, Poster, imdbID }){
    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch({type:"ADD_FAVORITE", payload:{Title, Year, imdbID}});
        
    };

    return (
        <article className="movie-item">
            <img className="movie-item__poster" src={Poster}alt={Title} />
            <div className="movie-item__info">
                <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                <button type="button" className="movie-item__add-button" onClick={handleClick}>Добавить в список</button>
            </div>
        </article>
    );
}
 
export default MovieItem;