'use client';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import postCoworkingspace from "@/libs/postCoworkingspace";
import { revalidateTag } from "next/cache";
import { useRouter } from 'next/navigation';

export default function ClientSideForm({ token }: { token: string }) {
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleCreateCoworkingspace = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
    
        const name = formData.get('Name') as string;
        const address = formData.get('Address') as string;
        const operatingHours = formData.get('OperatingHours') as string;
        const province = formData.get('Province') as string;
        const postalCode = formData.get('Postal Code') as string;
        const tel = formData.get('Tel') as string;
        const picture = formData.get('Picture') as string;
    
        try {
            const response = await postCoworkingspace(name, address, operatingHours, province, postalCode, tel, picture, token);
    
            if (response.success) {
                console.log('Coworkingspace created successfully');
                const revalidateResponse = await fetch('/api/revalidate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tags: ['coworkingspace', 'coworkingspaces'] }),
                });
    
                if (revalidateResponse.ok) {
                    console.log('Revalidation successful');
                    router.push('/coworkingspace');
                    router.refresh();
                } else {
                    console.error('Failed to revalidate:', revalidateResponse.statusText);
                }
            } else {
                console.error('Failed to create coworking space:', response);
                setErrorMessage(response.message.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Failed to create or revalidate:', error);
            setErrorMessage("An unexpected error occurred.");
            setShowModal(true);
        }
    };

    return (
        <>
            <form onSubmit={handleCreateCoworkingspace} className="w-[70%] justify-center px-2 py-16 grid grid-cols-[40%_40%] gap-y-8 gap-x-20 border border-2 rounded-lg">
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Name
                    </div>
                    <TextField placeholder="Name" name="Name" variant="standard" className="w-[100%] mb-5" required />
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Address
                    </div>
                    <TextField multiline placeholder="Address" name="Address" variant="standard" className="w-[100%] mb-5" required />
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Operating Hours
                    </div>
                    <TextField placeholder="OperatingHours" name="OperatingHours" variant="standard" className="w-[100%] mb-5" required />
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Province
                    </div>
                    <TextField placeholder="Province" name="Province" variant="standard" className="w-[100%] mb-5" required />
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Tel.
                    </div>
                    <TextField placeholder="Tel" name="Tel" variant="standard" className="w-[100%] mb-5" required />
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Postal Code
                    </div>
                    <TextField placeholder="Postal Code" name="Postal Code" variant="standard" className="w-[100%] mb-5" required />
                </div>
                <div>
                    <div className="text-md text-left text-black font-semibold">
                        Enter Picture URL
                    </div>
                    <TextField placeholder="Picture" name="Picture" variant="standard" className="w-[100%] mb-5" required />
                </div>
                <div className="flex items-end">
                    <Button
                        type="submit"
                        name="Create coworkingspace"
                        className={'w-[100%] h-[80%] block px-3 py-2 mt-5 text-white hover:bg-blue-800'}
                        variant="contained"
                        sx={{ backgroundColor: "#1d4ed8" }}
                    >
                        <div>Create<SendIcon className="ml-3" /></div>
                    </Button>
                </div>
            </form>

            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} color="primary" sx={{ textTransform: 'none' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}