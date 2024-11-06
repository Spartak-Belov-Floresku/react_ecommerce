import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed } from "./user.action";

import { getCurrentUser, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        console.log(`userSnapshot ${JSON.stringify(userSnapshot)}`)
        console.log(`userSnapshot.data ${JSON.stringify(userSnapshot.data())}`)
    } catch(error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield put(getSnapshotFromUserAuth, userAuth);
    }catch (error){
        yield put(signInFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSaga() {
    yield all([call(onCheckUserSession)])
}