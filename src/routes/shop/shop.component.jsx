import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Catgory from '../category/category.component';
import { fetchCategoriesAsync } from '../../store/categories/category.action';


const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch])

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category" element={<Catgory />} />
        </Routes>
    );
}

export default Shop;