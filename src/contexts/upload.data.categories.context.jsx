import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
// import { SHOP_DATA } from '../shop-data.js';



export const CatigoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    },[])

    // run once to create collection (table) in DB
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // },[]);

    const value = { categoriesMap };

    return <CatigoriesContext.Provider value={value}>{children}</CatigoriesContext.Provider>
}