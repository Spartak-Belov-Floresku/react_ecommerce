import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from "react-redux";

//import { fetchCategoriesAsync } from '../../store/categories/category.action';
import { fetchCategoriesStart } from '../../store/categories/category.action';

import { CategoriesPreview } from '../categories-preview/categories-preview.component';
import { Category } from '../category/category.component';

import './shop.styles.scss'

export const Shop = () => {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCategoriesAsync());
  // },[]);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  },[]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}
