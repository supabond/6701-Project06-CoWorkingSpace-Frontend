export default async function getHospital(id:string) {
    const response = await fetch(`https://2110507-vaccine-app-backend-phi.vercel.app/api/v1/hospitals/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch car")
    }
    return await response.json()
}