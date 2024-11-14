import React from 'react';
import { AppDispatch } from "@/redux/store";
import { useDispatch } from 'react-redux';
import { toggleColor } from '../redux/features/colorSlice';

const ToggleColorButton = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleToggleColor = () => {
        dispatch(toggleColor());
    };

    return (
        <button onClick={handleToggleColor} className="bg-gray-500  h-[50%] text-white p-2 rounded-2xl">
            Toggle Color
        </button>
    );
};

export default ToggleColorButton;