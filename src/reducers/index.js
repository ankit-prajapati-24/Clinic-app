import { combineReducers } from "@reduxjs/toolkit";

import UserDataSlice from "../slices/UserDataSlice";
const rootReducer = combineReducers({
    User:UserDataSlice,
});

export default  rootReducer