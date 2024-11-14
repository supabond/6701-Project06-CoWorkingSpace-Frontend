'use client';

import React from 'react';
import Link from 'next/link';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppSelector } from '@/redux/store';

export default function AddCoworkingspaceButton() {

    const roleColor = useAppSelector((state) => state.colorSlice);

    return (
        <div className={`w-full h-[300px] bg-white border border-2 rounded-md border-gray-300 outline outline-2 outline-offset-4 ${roleColor.outlineColor} flex justify-center items-center`}>
            <Link href="/coworkingspace/create" passHref className="flex justify-center items-center">
                <IconButton
                    sx={{
                        width: '60%',
                        height: '60%',
                        color: (roleColor.bgColor==='bg-blue-700')? '#1d4ed8':'#f97316', // bg-blue-700
                        '&:hover': {
                            color: (roleColor.hoverBgColor==='hover:bg-blue-800')? '#1E40AF': '#ea580c', // bg-blue-800
                        },
                    }}
                >
                    <AddCircleOutlineIcon fontSize="large" sx={{ width: '100%', height: '100%' }} />
                </IconButton>
            </Link>
        </div>
    );
};

// export default AddCoworkingspaceButton;