import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
import ProductCard from '../../components/product-card/product-card.commponent';
import Spinner from '../../components/spinner/spinner.component';

import { Title, Container } from './category.styles';


const Catgory = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Spinner />
            ):(
            <Container>
                {products && products.map(product => <ProductCard key={product.id} product={product} />)}
            </Container>
            )}
        </>
    )

}

export default Catgory;