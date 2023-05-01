import './directory.style.scss'
import CategoryItem from '../category-item/category-item.component';

const Directory = ({ categories}) => {
    return(
        <div className="directory-container">
        {categories.map(category => (
            <CategoryItem key={category.id} imageUrl={category.imageUrl} title={category.title}/>
        ))}
        </div>
    )
}

export default Directory