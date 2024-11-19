import { CoworkingspaceJson } from "../../interfaces";

export default async function getCoworkingspaces(): Promise<CoworkingspaceJson> {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/coworkingspaces`,   {
        next: {
            tags : ['coworkingspaces']
        }
    })
    if(!response.ok) {
        throw new Error("Failed to fetch coworkingspaces")
    }
    return await response.json()
}