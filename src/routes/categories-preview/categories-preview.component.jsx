import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { setCategoriesMap } from '../../store/categories/category.action';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import { CategoryPreview } from '../../components/category-preview/category-preview.component';


export const CategoriesPreview = () => {

  const categoriesMap = useSelector(selectCategoriesMap);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
        const categories = await getCategoriesAndDocuments();
        dispatch(setCategoriesMap(categories));
    }
    getCategoriesMap();
  },[])


  return (
    <>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title]
        return <CategoryPreview key={title} title={title} products={products} />
      })}
    </>
  )
}
