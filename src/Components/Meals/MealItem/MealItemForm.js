import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {

    const [amoutIsValid, setAmountIsValid] = useState(true)

    const amountInputRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 || 
            enteredAmountNumber < 1 || 
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);

    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Input
                ref= {amountInputRef}
                label='Amount'
                input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!amoutIsValid && <p>Please enter a valid amount between 1 to 5</p> }
        </form>
    );
};

export default MealItemForm;