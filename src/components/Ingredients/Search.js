import React,{useState,useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter,setEnteredFilter]=useState('');
  const {onLoadIngredients}=props;
  useEffect(()=>{
    fetch('https://react-app-7bde4-default-rtdb.firebaseio.com/ingredients.json').then(response => response.json()).then(responseData => {
      const loadedingredients=[];
      for(const key in responseData)
      {
        loadedingredients.push({
          id:key,
          title:responseData[key].title,
          amount:responseData[key].amount
  
        });
      }
      onLoadIngredients(loadedingredients)
    });
  },[enteredFilter,onLoadIngredients]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={event=>setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
