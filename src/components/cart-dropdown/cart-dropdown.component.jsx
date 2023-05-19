import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems
} from './cart-dropdown.styles';

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);
    const nav = useNavigate();

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length
                        ? (cartItems.map(item => <CartItem key={item.id} cartItem={item} />))
                        : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            {cartItems.length? <Button onClick={() => {nav('/checkout')}}>GO TO CHECKOUT</Button>:''}
        </CartDropdownContainer>
    )
}

export default CartDropdown;