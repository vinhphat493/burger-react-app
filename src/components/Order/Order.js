import React from 'react';
import classes from './Order.css'

const Order = props => {
    const { price, ingredients } = props;
    const fetchedIng = [];
    for (let ingName in ingredients) {
        fetchedIng.push({
            name: ingName,
            amount: ingredients[ingName],
        })
    }
    const ingHtml = fetchedIng.map(ing => {
        return <span key={ing.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}>{ing.name} ({ing.amount})</span>
    })
    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingHtml}</p>
        <p>
          Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
        </p>
      </div>
    );
}
 
export default Order;