'use server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function getBooking() {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('No session found');
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.user.token}`,
        },
    })

    if (!res.ok) {
        throw new Error('Get booking failed');
    }

    return await res.json();
}