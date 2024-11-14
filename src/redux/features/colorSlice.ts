import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ColorState = {
    textColor: string;
    textDarkColor: string;
    logoColor: string;
    bgColor: string;
    borderColor: string;
    hoverTextColor: string;
    hoverBgColor: string;
    outlineColor: string;
};

const initialState: ColorState = {
    textColor: 'text-orange-500',
    textDarkColor: 'text-orange-700',
    logoColor: 'text-orange-600',
    bgColor: 'bg-orange-500',
    borderColor: 'border-orange-500',
    hoverTextColor: 'hover:text-orange-500',
    hoverBgColor: 'hover:bg-orange-600',
    outlineColor: 'outline-orange-500',
};

const alternateState: ColorState = {
    textColor: 'text-blue-700',
    textDarkColor: 'text-blue-900',
    logoColor: 'text-blue-800',
    bgColor: 'bg-blue-700',
    borderColor: 'border-blue-700',
    hoverTextColor: 'hover:text-blue-700',
    hoverBgColor: 'hover:bg-blue-800',
    outlineColor: 'outline-blue-700',
};

export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        toggleColor: (state) => {
            return state.textColor === initialState.textColor ? alternateState : initialState;
        },
    },
});

export const { toggleColor } = colorSlice.actions;
export default colorSlice.reducer;