import React, { useState,useEffect } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
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
    setUserIngredients(loadedingredients);
  }) 
});
const filteredIngredientsHandler = filteredIngredients =>{
  setUserIngredients(filteredIngredients)
}
  const addIngredientHandler = (ingredient) => {
    fetch('https://react-app-7bde4-default-rtdb.firebaseio.com/ingredients.json',{
      method:'POST',
      body: JSON.stringify(ingredient),
      headers:{'Content-Type':'application/json'}
    }).then( response =>{
      return response.json();
    }).then(responseData =>{
      setUserIngredients((prevIngredients) => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient },
      ])
    });
   
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={()=>{}}/>
      </section>
    </div>
  );
};

export default Ingredients;
