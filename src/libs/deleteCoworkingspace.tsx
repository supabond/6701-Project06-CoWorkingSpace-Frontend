export default async function deleteCoworkingspace(coworkingspaceId:string, token:string) {

    const response = await fetch( `${process.env.BACKEND_URL}/api/v1/coworkingspaces/${coworkingspaceId}` ,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    if(!response.ok) {
        throw new Error('Delete Coworkingspace failed');
    }

    return await response.json();
}