import React from 'react'
import { Typography, Box } from '@mui/material'

import userMe from '@/libs/userMe';

export default async function page() {
    const res = await userMe();
    const user = res.data;

    return (
    <div className="bg-white h-screen relative">
        <Box className="flex flex-col items-center justify-center h-[70%] text-gray-900">
            <h2 className="text-6xl font-extrabold text-blue-600 pb-12">
                Profile
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
                <Typography variant="h6" className="pb-4 text-lg font-medium">
                    Name: <span className="font-semibold">{user.name}</span>
                </Typography>
                <Typography variant="h6" className="pb-4 text-lg font-medium">
                    Email: <span className="font-semibold">{user.email}</span>
                </Typography>
                <Typography variant="h6" className="pb-4 text-lg font-medium">
                    Telephone: <span className="font-semibold">{user.tel}</span>
                </Typography>
            </div>
        </Box>
    </div>
    )
}
