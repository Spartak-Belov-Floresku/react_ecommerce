import { useNavigate } from "react-router-dom"
import {
    DerectoryItemContainer,
    BackgroundImage,
    Body
} from "./directory-item.styles"

const DirectoryItem = ({ category }) => {
    const { imageurl, title, route } = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
        <DerectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageurl={imageurl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DerectoryItemContainer>
    )
}

export default DirectoryItem