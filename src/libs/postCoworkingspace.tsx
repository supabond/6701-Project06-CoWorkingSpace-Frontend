export default async function postCoworkingspace(name:string, address:string, operatingHours:string, province:string, postalCode:string, tel:string, picture:string, token:string) {
    
    const response = await fetch( `${process.env.BACKEND_URL}/api/v1/coworkingspaces` ,{
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
    return await response.json();
}