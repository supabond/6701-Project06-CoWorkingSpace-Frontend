// src/components/PurgeButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { PURGE } from 'redux-persist';

const PurgeButton = () => {
    const dispatch = useDispatch();

    const handlePurge = () => {
        dispatch({ type: PURGE, result: () => null });
    };

    return (
        <button onClick={handlePurge} className="bg-red-500 h-[50%] text-white p-2 rounded-2xl">
            Purge State
        </button>
    );
};

export default PurgeButton;