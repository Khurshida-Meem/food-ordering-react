import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartContext = useContext(CartContext);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    }

    const cartItemHandler = item => {
        cartContext.addItem({ ...item, amount: 1 })
    }

    const handleOrder = () => {
        setIsCheckout(true);
    }

    // send data to backend
    const submitOrderHandler = async (userData) => {
        setSubmitting(true);
        await fetch('https://food-order-react-931ff-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartContext.items
            })
        })
        setSubmitting(false);
        setDidSubmit(true);
        cartContext.clearCart();
    }

    const cartItems = <ul>{cartContext.items.map(item => (
        <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemHandler.bind(null, item)}
        />
    ))}</ul>

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={handleOrder}>Order</button>}
    </div>

    const cartModalContent = (<React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount} </span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </React.Fragment>);

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = <React.Fragment>
        <p>Received order successfully..</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!submitting && !didSubmit && cartModalContent}
            {submitting && isSubmittingModalContent}
            {!submitting && didSubmit && didSubmitModalContent}

        </Modal>
    );
};

export default Cart;