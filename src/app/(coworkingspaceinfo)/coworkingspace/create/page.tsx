import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import postCoworkingspace from "@/libs/postCoworkingspace";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';


// import getUserProfile from "@/libs/getUserProfile";
// import { getServerSession } from "next-auth";

export default async function CreateCoworkingspace() {

    // const [name, setName] = useState<string>('')
    // const [address, setAddress] = useState<string>('')
    // const [operatingHours, setOperatingHours] = useState<string>('')
    // const [province, setProvince] = useState<string>('')
    // const [postalCode, setPostalCode] = useState<string>('')
    // const [tel, setTel] = useState<string>('')
    // const [picture, setPicture] = useState<string>('')
    // const [loading, setLoading] = useState(false);
    // const [completed, setCompleted] = useState(false);

    const session = await getServerSession(authOptions);

    const createCoworkingspace = async (createCoworkingspaceForm: FormData) => {
        "use server"
        const name = createCoworkingspaceForm.get('Name') as string;
        const address = createCoworkingspaceForm.get('Address') as string;
        const operatingHours = createCoworkingspaceForm.get('OperatingHours') as string;
        const province = createCoworkingspaceForm.get('Province') as string;
        const postalCode = createCoworkingspaceForm.get('Postal Code') as string;
        const tel = createCoworkingspaceForm.get('Tel') as string;
        const picture = createCoworkingspaceForm.get('Picture') as string;

        try {
            const response = await postCoworkingspace(name, address, operatingHours, province, postalCode, tel, picture, session?.user.token || '');
        } catch (error) {
            console.error("Error creating new co-ws: ", error);
        }

        revalidateTag('coworkingspaces');
        redirect('/coworkingspace');
    }

    // const handleButtonClick = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         const success = handleCreateCoworkingspace();
    //         setLoading(false);
    //         if (success) {
    //             setCompleted(true);
    //             setTimeout(() => {
    //                 setCompleted(false);
    //             }, 2000); // Change back to original text after 1 seconds
    //         }
    //     }, 2000); // Simulate a 1-second loading time
    // };
    
    // const handleCreateCoworkingspace = async () => {
    //     // alert(1);
    //     const response = await postCoworkingspace(name, address, operatingHours, province, postalCode, tel, picture, session?.user.token || '');
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //         setCompleted(true);
    //             setTimeout(() => {
    //                 setCompleted(false);
    //                 revalidateTag('coworkingspaces');
    //                 redirect('/coworkingspace');
    //         }, 2000);
    //     }, 2000);
    // };
    if(!session || !session.user.token) {
        return null;
    }
    
    const profile = await getUserProfile(session.user.token);

    // const profile = await getUserProfile(session.user.token);
    // var createdAt = new Date(profile.data.createdAt);

    return (
        (profile.data.role=="admin") ?
        <main className="w-[100%] flex flex-col items-center mt-5">
            <div className="text-lg text-gray-500 font-light mt-12 mb-8 text-center">
                Provide coworking space information and submit.
            </div>
                <form  action={createCoworkingspace} className="w-[70%] justify-center px-2 py-16 grid grid-cols-[40%_40%] gap-y-8 gap-x-20 border border-2 rounded-lg">
                    <div>
                        <div className="text-md text-left text-black font-semibold">
                            Enter Name
                        </div>
                        <TextField placeholder="Name" name="Name" variant="standard" className="w-[100%] mb-5" required
                        />
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Address
                        </div>
                        <TextField multiline placeholder="Address" name="Address" variant="standard" className="w-[100%] mb-5" required
                        />
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Operating Hours
                        </div>
                        <TextField placeholder="OperatingHours" name="OperatingHours" variant="standard" className="w-[100%] mb-5" required
                        />
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Province
                        </div>
                        <TextField placeholder="Province" name="Province" variant="standard" className="w-[100%] mb-5" required
                        />
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Tel.
                        </div>
                        <TextField placeholder="Tel" name="Tel" variant="standard" className="w-[100%] mb-5" required
                        />
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold">
                            Enter Postal Code
                        </div>
                        <TextField placeholder="Postal Code" name="Postal Code" variant="standard" className="w-[100%] mb-5" required
                        />
                    </div>
                    <div>
                        <div className="text-md text-left text-black font-semibold" >
                            Enter Picture URL
                        </div>
                        <TextField placeholder="Picture" name="Picture" variant="standard" className="w-[100%] mb-5" required
                        />
                    </div>

  

                    <div className="flex items-end">
                        <Button
                            type="submit"
                            name="Create coworkingspace"
                            className={'w-[100%] h-[80%] block px-3 py-2 mt-5 text-white hover:bg-indigo-600'}
                            // sx={{ textTransform: 'none', borderRadius: '1rem', fontSize: '1rem' }}
                            // onClick={handleCreateCoworkingspace}
                            // disabled={(loading || completed)}
                            variant="contained"
                            color="primary"
                        >
                            <div>Create<SendIcon className="ml-3"/></div>
                            {/* {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : completed ? (
                                <CheckCircleOutlineIcon sx={{ color: 'white', fontSize: '36px'}}/>
                            ) : (
                                <div>Create<SendIcon className="ml-3"/></div>
                                
                            )} */}
                        </Button>
                    </div>
                </form>

        </main>
            :
            <main className="text-lg text-gray-500 py-[200px] font-light flex flex-col justify-center items-center">
                <div>You are not authorized to create a new coworking space.</div>
                <div>Please contact the administrator.</div>
            </main>

    );

}