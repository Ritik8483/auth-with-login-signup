import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const AuthUser=createApi({
    reducerPath: 'AuthUserReducer',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://testtourapp.herokuapp.com/' }),
    endpoints:(builder)=>({
        loginUser:builder.mutation({
            query:(credentials)=>{
                return{
                    url:'/users/signin',
                    method:'POST',
                    body:credentials
                }
            }
        }),
        registerUser:builder.mutation({
            query:(credentials)=>{
                return{
                    url:'/users/signup',
                    method:'POST',
                    body:credentials
                }
            }
        }),
    })
});

export const {useLoginUserMutation,useRegisterUserMutation}=AuthUser;
export default AuthUser;
