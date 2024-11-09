import { CoworkingspaceJson } from "../../interfaces";

export default async function getCoworkingspaces(): Promise<CoworkingspaceJson> {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await fetch(`http://localhost:5555/api/v1/coworkingspaces`)
    if(!response.ok) {
        throw new Error("Failed to fetch hospitals")
    }
    return await response.json()
}