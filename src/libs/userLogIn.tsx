export default async function userLogIn(userEmail:string, userPassword:string) {
    const response = await fetch( `${process.env.BACKEND_URL}/api/v1/auth/login` ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })

    if(!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
}