import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Employees {
  id: number;
  name: string;
  email: string;
  phone: number;
}
export const EmployeeRtk = createApi({
  reducerPath: "EmployeeReducer",
  tagTypes: ["addEmployeeTag"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employees[], any>({
      query: (params) =>
        params.searchField
          ? `/employee?&name_like=${params.searchField}&_sort=id&_order=${params.orderType}`
          : `/employee?&name_like=${params.searchField}&_start=${params.initialEntry}&_end=${params.finalEntry}&_sort=id&_order=${params.orderType}`,
      providesTags: ["addEmployeeTag"],
    }),
    totalEmployees: builder.query<any, void>({
      query: () => "/employee",
      providesTags: ["addEmployeeTag"],
    }),
    viewEmployee: builder.query<Employees, any>({
      query: (id) => `/employee/${id}`,
      providesTags: ["addEmployeeTag"],
    }),
    addEmployee: builder.mutation<void, Employees>({
      query: (details) => ({
        url: "/employee",
        method: "POST",
        body: details,
      }),
      invalidatesTags: ["addEmployeeTag"],
    }),
    deleteEmployee: builder.mutation<string, Employees>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["addEmployeeTag"],
    }),
    editEmployee: builder.mutation<string, any>({
      query: ({ id, values }) => ({
        url: `/employee/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["addEmployeeTag"],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useTotalEmployeesQuery,
  useViewEmployeeQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useEditEmployeeMutation,
} = EmployeeRtk;
export default EmployeeRtk;
