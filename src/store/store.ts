import { configureStore } from "@reduxjs/toolkit";
import AuthUser from "../rtk/AuthUser";
import EmployeeRtk from "../rtk/EmployeeRtk";
import AuthUserSlice from "../slice/AuthUserSlice";

export const store=configureStore({
    reducer:{
        AuthUserSliceReducer:AuthUserSlice,
        [AuthUser.reducerPath]:AuthUser.reducer,
        [EmployeeRtk.reducerPath]:EmployeeRtk.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthUser.middleware).concat(EmployeeRtk.middleware),
});
export default store;
