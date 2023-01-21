import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListPage.css';

function ListPage() {
    const[movies, setMovies]=useState([])
    const[title, setTitle]=useState("")
    
    const {id} = useParams();
       
    useEffect(()=> {

        fetch(`https:/acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(Response => Response.json())
        .then( data => {
            
            setTitle(data.title);

            let requests = data.movies.map((movie) => 
            fetch(`http://www.omdbapi.com/?i=${movie}&apikey=f849690d`)
            );
            Promise.all(requests).then((responses)=>
            Promise.all(responses.map((item) => item.json()))).then((data) =>
            setMovies(data));
          
        })
      
    },[])
    
        return (
            <div className="list-page">
                <h1 className="list-page__title">{title}</h1>
                <ul>
                    {movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href ={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.Title} ({item.Year})</a>
                                <img className="list-page__poster" src={item.Poster} alt={""} width="80" height="100"></img>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
}
 
export default ListPage;