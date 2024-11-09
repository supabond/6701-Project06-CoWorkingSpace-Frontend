import React from 'react'
import { TextField, Typography, Box } from '@mui/material'

export default function page() {
    // Mocking user profile page

    return (
        <div className="bg-white">
            <Box className="flex flex-col items-center justify-center pb-[20%] h-screen text-black">
                <h2 className='text-5xl font-bold text-blue-600 pb-12'>
                    Profile
                </h2>
                <Typography variant='h6' className='pb-4'>
                    Name: John Doe
                </Typography>
                <Typography variant='h6' className='pb-4'>
                    Email: test@test.com
                </Typography>
                <Typography variant='h6' className='pb-4'>
                    Phone: 0123456789
                </Typography>
                <Typography variant='h6' className='pb-4'>
                    Address: 123 Test Street
                </Typography>
            </Box>
        </div>
    )
}
