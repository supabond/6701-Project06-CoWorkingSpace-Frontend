export default async function updateCoworkingspace(cowokingspaceId:string, name:string, address:string, operatingHours:string, province:string,
    postalCode:string, tel:string, picture:string, token:string) 
 {
    
    const dummy_coworkingspace = '6724d1163b3649fca966d9e7';
    const response = await fetch( `http://localhost:5555/api/v1/coworkingspaces/${cowokingspaceId}` ,{
        method: 'PUT',
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