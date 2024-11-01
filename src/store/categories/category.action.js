import { createAction } from "../../utils/reducer/reduser.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const fetchCategoriesStart = () => createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START
);

const fetchCategoriesSuccess = categoriesArray => createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
);

const fetchCategoriesFailed = err => createAction(
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