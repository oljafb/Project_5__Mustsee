import React from 'react';
import './Favorites.css';
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

function Favorites() {
    const [listName, setListName] = useState("");
    const [linkTo, setLinkTo] = useState("");

    const changeListName = (e)=>{
        setListName(e.currentTarget.value);
    };
    
    const favorites = useSelector(store => store.favorite);
   
    const dispatch = useDispatch();
    const handleDelete = (e) =>{
        dispatch({
            type:"DELETE_FAVORITE", 
            payload: {imdbID:e.currentTarget.id}
        });
    };
    
    const handleListSave = async ()=>{
        let moviesList = {
            title:"",
            movies:[]
        };
        moviesList.title = listName;
        moviesList.movies  = favorites.map((item) => item.imdbID);

        let response = await fetch("https://acb-api.algoritmika.org/api/movies/list",        
            {
                method:"POST",
                headers:{
                    "Content-type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(moviesList),
            }
        );

        let result = await response.json();
        setLinkTo(`/list/${result.id}`);      
      
   
    };

    if (!linkTo){ 
          return (
            <div className="favorites">
                      <input className="favorites__name" onChange={changeListName} placeholder={"Введите название списка"} required value={listName}  />
                       <ul className="favorites__list">
                           {favorites.map((item) => {
                           return <li className="favorites__item" key={item.id}>
                                    {item.Title} ({item.Year})
                                    <button type="button" onClick={handleDelete} id={item.imdbID}>X</button>
                                   </li>;
                              })}                    
                      </ul>
                                <button type="button" className="favorites__save" disabled={!listName} onClick={handleListSave}>Сохранить список</button>                             
                                                                 
            </div>
        );
     } else{
           return (
                <div className="favorites">                                 
                      <input className="favorites__name" onChange={changeListName} value={listName}  />
                            <ul className="favorites__list">
                                 {favorites.map((item) => {
                                 return <li className="favorites__item" key={item.id}>
                                           {item.Title} ({item.Year})
                                        </li>;
                                  })}  
                                </ul>
                             <Link to={linkTo}> {listName} </Link>
                 
                </div>
        );
    };
};

 
export default Favorites;