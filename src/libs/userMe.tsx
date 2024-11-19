export default async function userMe(token: string) {


    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })

    if (!res.ok) {
        throw new Error('Get user failed');
    }

    return await res.json();
}