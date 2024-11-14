import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';
import ClientSideForm from '@/components/ClientSideForm';

export default async function CreateCoworkingspace() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.token) {
        return null;
    }

    const profile = await getUserProfile(session.user.token);

    return (
        (profile.data.role == "admin") ?
            <main className="w-[100%] flex flex-col items-center mt-5">
                <div className="text-lg text-gray-500 font-light mt-12 mb-8 text-center">
                    Provide coworking space information and submit.
                </div>
                <ClientSideForm token={session.user.token} />
            </main>
            :
            <main className="text-lg text-gray-500 py-[200px] font-light flex flex-col justify-center items-center">
                <div>You are not authorized to create a new coworking space.</div>
                <div>Please contact the administrator.</div>
            </main>
    );
}