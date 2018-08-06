import React, { Component} from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        purchasing: false,
        loading: false
    };

    puchaseHandler = () => {
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

    purchaseCanceledHandler = () => {
      this.setState ({
        purchasing : false
      });
    }

    purchaseContinueHandler = () => {

      this.setState ({ loading: true});

      const order = {
        ingredients : this.state.ingredients,
        price : this.state.totalPrice,
        customer : {
          name: 'Rune Kvamme',
          address: 
            {
              street: 'Estenstadveien 42',
              zipCode: '7049',
              country: 'Norway'
            },
            email: 'ruk@hipoconder.com'
        },  
        deliveryMethod: 'fastest'
      };

      axios.post('/orders.json',order)
        .then( responce => {
            this.setState( {loading: false, purchasing: false});
          })
        .catch( error => {
          this.setState( {loading: false, purchasing: false});
        });
    } 

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
          ingredients={this.state.ingredients}
          canceled={this.purchaseCanceledHandler}
          continue={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />;

        if (this.state.loading) {
          orderSummary = <Spinner/>
        }

        return ( 
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
              {orderSummary}
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

export default withErrorHandler(BurgerBuilder, axios);