import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function userMe() {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('No session found');
    }

    const res = await fetch('http://localhost:5000/api/v1/auth/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${session.user.token}`,
        },
    })

    if (!res.ok) {
        throw new Error('Get user failed');
    }

    return await res.json();
}