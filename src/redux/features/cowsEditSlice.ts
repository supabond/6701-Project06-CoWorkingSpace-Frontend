import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {isEdit: false}

export const cowsEditSlice = createSlice({
    name: "cowsEdit",
    initialState,
    reducers: {
        setEditState: (state) => {
            state.isEdit = true;
        },
        resetEditState: (state) => {
            state.isEdit = false;
        }
    },
});

export const { setEditState, resetEditState } = cowsEditSlice.actions;
export default cowsEditSlice.reducer;