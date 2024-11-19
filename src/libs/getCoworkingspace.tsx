export default async function getCoworkingspace(id:string) {


    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/coworkingspaces/${id}`,  {
        next: {
            tags : ['coworkingspace']
        }
    })
    if(!response.ok) {
        throw new Error("Failed to fetch coworkingspace")
    }
    return await response.json()
}