import {
    DerectoryItemContainer,
    BackgroundImage,
    Body
} from "./directory-item.styles"

const DirectoryItem = ({ imageUrl, title }) => {
    return (
        <DerectoryItemContainer>
            <BackgroundImage  imageUrl={imageUrl}/>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DerectoryItemContainer>
    )
}

export default DirectoryItem