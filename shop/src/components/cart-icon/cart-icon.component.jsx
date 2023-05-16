import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer,
         ShoppingIcon,
         ItemCount,
} from './cart-icon.styles';


const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartItems, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;