import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                {['Product', 'Description', 'Quantity', 'Price', 'Remove'].map(title => {
                        return<div className='header-block' key={title}><span>{title}</span></div>
                    })
                }
            </div>
            {cartItems.map(item => <CheckoutItem key={item.id} cartItem={item}/>)}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout;