import { useContext } from 'react';

import { CatigoriesContext } from '../../contexts/categories.context';
import { CategoryPreview } from '../../components/category-preview/category-preview.component';

export const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CatigoriesContext);

  return (
    <>
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title]
        return <CategoryPreview key={title} title={title} products={products} />
      })}
    </>
  )
}
