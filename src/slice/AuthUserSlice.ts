import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthType {
  name: string | null;
  token: string | null;
}
const initialState: AuthType = {
  name: null,
  token: null,
};

export const AuthUserSlice = createSlice({
  name: "AuthUserSliceReducer",
  initialState,
  reducers: {
    setLocalStorage: (state, { payload }) => {
      console.log({ state, payload });

      localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          name: payload.name,
          token: payload.token,
        })
      );
      state.name = payload.name;
      state.token = payload.token;
    },
    logoutUser:(state)=>{
      localStorage.clear();
      state.name=null;
      state.token=null;
    }
  },
});

export const { setLocalStorage,logoutUser } = AuthUserSlice.actions;
export default AuthUserSlice.reducer;
