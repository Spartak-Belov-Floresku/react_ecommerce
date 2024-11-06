import { createAction } from "../../utils/reducer/reduser.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START
);

export const fetchCategoriesSuccess = categoriesArray => createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
);

export const fetchCategoriesFailed = err => createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED,
    err
);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try{
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    }catch(err){
        dispatch(fetchCategoriesFailed(err));
    }
}