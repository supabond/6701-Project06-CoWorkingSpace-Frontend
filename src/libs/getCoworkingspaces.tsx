import { CoworkingspaceJson } from "../../interfaces";

export default async function getCoworkingspaces(): Promise<CoworkingspaceJson> {

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await fetch('http://localhost:5555/api/v1/coworkingspaces',   {
        next: {
            tags : ['coworkingspaces']
        }
    })
    if(!response.ok) {
        throw new Error("Failed to fetch coworkingspaces")
    }
    return await response.json()
}