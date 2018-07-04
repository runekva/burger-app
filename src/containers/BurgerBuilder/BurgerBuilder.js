import React, { Component} from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.6,
    meat: 0.8   
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };


    puchaseHandler () {
        this.setState ( {
            purchasing : true
        })
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map (key => ingredients[key])
            .reduce ( (prev, next) => prev + next,0);

        this.setState (
            { purchasable : sum > 0}
        );
    }

    addIngridientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients,
            [type] : this.state.ingredients[type] + 1
        }
        const newPrice = this.state.totalPrice + INGRIDIENT_PRICES[type];

        this.setState( {
            ingredients : updatedIngredients,
            totalPrice : newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngridientHandler = (type) => {
        if (this.state.ingredients[type] <= 0)
            return;
         const updatedIngredients = {
            ...this.state.ingredients,
            [type] : this.state.ingredients[type] - 1
        }
        const newPrice = this.state.totalPrice - INGRIDIENT_PRICES[type];

        this.setState( {
            ingredients : updatedIngredients,
            totalPrice : newPrice
        }); 
        this.updatePurchaseState(updatedIngredients);

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return ( 
        <Aux>
            <Modal>
                <OrderSummary ingredients={this.state.ingredients}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                ingredientsAdded={this.addIngridientHandler} 
                ingredientsRemoved={this.removeIngridientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.puchaseHandler}/>
        </Aux>) 
    };

}

export default BurgerBuilder;