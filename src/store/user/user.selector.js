import { createSelector } from "reselect";

const selectUserReducer = state => state.user;

const selectUser = createSelector(
    [selectUserReducer],
    userSlice => userSlice.currentUser
);

// export const selectCurrentUser = state => state.user.currentUser;

export const selectCurrentUser = createSelector(
    [selectUser],
    currentUser => currentUser
)