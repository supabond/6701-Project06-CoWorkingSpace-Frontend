'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, Avatar, Container, LinearProgress} from '@mui/material';
import userMe from '@/libs/userMe';
import { useAppSelector } from '@/redux/store';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function UserProfile({ token }: { token: string }) {
    const [user, setUser] = useState<{ name: string; email: string; tel: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const roleColor = useAppSelector((state) => state.colorSlice);
    const avatarColor = (roleColor.bgColor === 'bg-orange-500') ? '#f97316' : '#1d4ed8';

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userMe(token);
                setUser(res.data);
                console.log('User data:', res.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center ml-16 mr-12">
                <div className='text-lg text-gray-500 font-light mt-28 mb-6 text-center'>Loading ...</div>
                <LinearProgress style={{ backgroundColor: '#6b7280' }} sx={{ height: 3, '& .MuiLinearProgress-bar': { backgroundColor: '#d1d5db' } }} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-gray-100 h-screen flex items-center justify-center">
                <Typography variant="h6" className="text-gray-700">
                    Failed to load user data.
                </Typography>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <Container maxWidth="sm">
                <Paper elevation={3} className="rounded-lg" style={{ borderRadius: '15px' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar className = "mt-10" sx={{ bgcolor: avatarColor, width: 100, height: 100, mb: 2, fontSize: 40 }}>
                            {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h4" className={`font-bold ${roleColor.logoColor} mb-4`}>
                            {user.name}
                        </Typography>
                        <div className="mt-10 mb-3 flex flex-row w-[70%] justify-center">
                            <div className="w-[10%]"></div>
                            <div className="w-[10%]"><MailIcon/></div>
                            <div className="w-[30%] font-bold text-lg mr-3">Email:</div>
                            <div className="w-[50%] text-lg">{user.email}</div>
                        </div>
                        <div className="flex mb-10 flex-row w-[70%] justify-center">
                            <div className="w-[10%]"></div>
                            <div className="w-[10%]"><LocalPhoneIcon/></div>
                            <div className="w-[30%] font-bold text-lg mr-3">Telephone:</div>
                            <div className="w-[50%] text-lg">{user.tel}</div>
                        </div>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}