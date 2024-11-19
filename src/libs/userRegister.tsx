export default async function userRegister(userName: string, userEmail:string, userTel: string, userPassword:string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            tel: userTel,
            role: 'user',
            password: userPassword,
            createdAt: new Date(),
        }),
    })

    if (!res.ok) {
        if (res.status === 400) {
            throw new Error('User already exists');
        } else {
            throw new Error('Register failed');
        }
    }

    return await res.json();
}