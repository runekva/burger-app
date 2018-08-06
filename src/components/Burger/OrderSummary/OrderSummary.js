import React from 'react';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const ingredientsSummary = 
        Object.keys(props.ingredients)
        .map( key => {
            return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>
        });

    return (

        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={props.canceled}>Cancel</Button>
            <Button buttonType="Success" clicked={props.continue}>Continue</Button>
        </Aux>
    );

};

export default orderSummary;
