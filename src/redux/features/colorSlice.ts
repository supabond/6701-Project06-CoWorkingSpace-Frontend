import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ReservationItem } from "../../../interfaces";

// type CartState = {
//     carItems: ReservationItem[]
// }

// const initialState: CartState = {
//     carItems: []
// }   

type ColorState = {
    textColor: string
    textDarkColor: string
    logoColor: string
    bgColor: string
    borderColor: string
    hoverTextColor: string
    hoverBgColor: string
    outlineColor: string

}
const initialState: ColorState = {
    // textColor: 'text-blue-700',
    // textDarkColor: 'text-blue-800',
    // logoColor: 'text-blue-900',
    // bgColor: 'bg-blue-700',
    // borderColor: 'border-blue-700',
    // hoverTextColor: 'hover:text-blue-700',
    // hoverBgColor: 'hover:bg-blue-800',
    // outlineColor: 'outline-blue-700'

    textColor: 'text-orange-500',
    textDarkColor: 'text-orange-700',
    logoColor: 'text-orange-600',
    bgColor: 'bg-orange-500',
    borderColor: 'border-orange-500',
    hoverTextColor: 'hover:text-orange-500',
    hoverBgColor: 'hover:bg-orange-600',
    outlineColor: 'outline-orange-500'
}

export const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {

        // addReservation: (state, action:PayloadAction<ReservationItem>) => {
        //     state.carItems.push(action.payload)
        // },
        // removeReservation: (state, action:PayloadAction<ReservationItem>) => {
        //     const remainItems = state.carItems.filter(obj => {
        //         return ( (obj.carModel !== action.payload.carModel) || 
        //         (obj.pickupDate !== action.payload.pickupDate) ||
        //         (obj.returnDate !== action.payload.returnDate) )
        //     })
        //     state.carItems = remainItems
        // }
    }
})

// export const { addReservation, removeReservation } = colorSlice.actions
export default colorSlice.reducer