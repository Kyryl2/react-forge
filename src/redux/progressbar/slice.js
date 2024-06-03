import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    password:'',
    confirm:''



}
const progress = createSlice({
    name:"form",
    initialState,
    reducers: {
        updateField: (state, action) => {
          const  value  = action.payload;
          state.password = value;
        },
        updateConfirm: (state, action) => {
          const  value  = action.payload;
          state.confirm = value;
        }


    },

})
export const { updateField, updateConfirm} = progress.actions;
export const formReducers = progress.reducer;