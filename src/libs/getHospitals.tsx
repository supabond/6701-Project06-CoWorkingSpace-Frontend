import { HospitalJson } from "../../interfaces";

export default async function getHospitals(): Promise<HospitalJson> {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await fetch(`https://2110507-vaccine-app-backend-phi.vercel.app/api/v1/hospitals`)
    if(!response.ok) {
        throw new Error("Failed to fetch hospitals")
    }
    return await response.json()
}