import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import { ProductCard } from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';


import './category.styles.scss'

export const Category = () => {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])

    return(
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading
                    ? <Spinner/>
                    : <div className='category-container'>
                        {products && products.map(product => <ProductCard key={product.id} product={product} /> )}
                      </div>
            }
        </>
    )

    // my suggetsions
    // const { category } = useParams();
    // const categoriesMap = useSelector(selectCategoriesMap);
    // const products = categoriesMap[category];

    // return(
    //     <>
    //         <h2 className='category-title'>{category.toUpperCase()}</h2>
    //         <div className='category-container'>
    //             {products && products.map(product => <ProductCard key={product.id} product={product} /> )}
    //         </div>
    //     </>
    // )
}