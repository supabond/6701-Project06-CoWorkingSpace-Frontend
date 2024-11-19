import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import UserProfile from "@/components/UserProfile";
export default async function page() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return null;
    }
    return (
        <div className="bg-white h-screen relative">
            <UserProfile token={session.user.token} />
        </div>
    )
}