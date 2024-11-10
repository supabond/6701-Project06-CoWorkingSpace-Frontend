export default async function postCoworkingspace(name:string, address:string, operatingHours:string, province:string, postalCode:string, tel:string, picture:string, token:string) {
    
    const response = await fetch( `http://localhost:5555/api/v1/coworkingspaces` ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "name": name,
            "address": address,
            "operatingHours": operatingHours,
            "province": province,
            "postalcode": postalCode,
            "tel": tel,
            "picture": picture
        }),
   
    })

    if(!response.ok) {
        throw new Error('Post Coworkingspace failed');
    }

    return await response.json();
}