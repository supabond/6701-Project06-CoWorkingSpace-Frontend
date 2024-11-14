'use client';

import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import Image from 'next/image';
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { resetEditState } from "@/redux/features/cowsEditSlice";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import updateCoworkingspace from "@/libs/updateCoworkingspace";
import { useRouter } from "next/navigation";

interface HospitalDetail {
    data: {
        name: string;
        address: string;
        operatingHours: string;
        province: string;
        postalcode: string;
        tel: string;
        picture: string;
    };
}

export default function InfoSection({ hospitalDetail, cid, token }: { hospitalDetail: HospitalDetail, cid: string, token: string }) {
    const cowsEdit = useAppSelector((state) => state.cowsEditSlice);
    const dispatch = useDispatch<AppDispatch>();
    const roleColor = useAppSelector((state) => state.colorSlice);

    const [name, setName] = useState(hospitalDetail.data.name);
    const [address, setAddress] = useState(hospitalDetail.data.address);
    const [operatingHours, setOperatingHours] = useState(hospitalDetail.data.operatingHours);
    const [province, setProvince] = useState(hospitalDetail.data.province);
    const [postalCode, setPostalCode] = useState(hospitalDetail.data.postalcode);
    const [tel, setTel] = useState(hospitalDetail.data.tel);
    const [picture, setPicture] = useState(hospitalDetail.data.picture);

    const [initialValues, setInitialValues] = useState({
        name: hospitalDetail.data.name,
        address: hospitalDetail.data.address,
        operatingHours: hospitalDetail.data.operatingHours,
        province: hospitalDetail.data.province,
        postalCode: hospitalDetail.data.postalcode,
        tel: hospitalDetail.data.tel,
        picture: hospitalDetail.data.picture,
    });

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter(); // Initialize useRouter

    const handleCancel = () => {
        dispatch(resetEditState());
        setName(initialValues.name);
        setAddress(initialValues.address);
        setOperatingHours(initialValues.operatingHours);
        setProvince(initialValues.province);
        setPostalCode(initialValues.postalCode);
        setTel(initialValues.tel);
        setPicture(initialValues.picture);
    };

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        

        try {
            const response = await updateCoworkingspace(cid, name, address, operatingHours, province, postalCode, tel, picture, token);

            if (response.success) {

                dispatch(resetEditState());

                setInitialValues({
                    name: name,
                    address: address,
                    operatingHours: operatingHours,
                    province: province,
                    postalCode: postalCode,
                    tel: tel,
                    picture: picture,
                });
                
                console.log('Coworkingspace updated successfully');
                const revalidateResponse = await fetch('/api/revalidate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tags: ['coworkingspace', 'coworkingspaces'] }),
                });

                if (revalidateResponse.ok) {
                    console.log('Revalidation successful');
                    router.push(`/coworkingspace/${cid}`);
                    router.refresh();
                } else {
                    console.error('Failed to revalidate:', revalidateResponse.statusText);
                }
            } else {
                console.error('Failed to update coworkingspace:', response);
                setErrorMessage(response.message.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error updating coworkingspace:', error);
            setErrorMessage("An unexpected error occurred.");
            setShowModal(true);
        }
    };

    return (
        <>
            {(!cowsEdit.isEdit) ?
                <div className="flex flex-row w-[70%] justify-center space-x-10 mt-3 mb-5">
                    <div className="w-[55%] relative h-auto rounded-lg shadow-none bg-white border border-2 border-gray-400">
                        <Image
                            src={picture}
                            alt='Hospital Image'
                            layout='fill'
                            objectFit="cover"
                            objectPosition="bottom"
                            className="rounded-md"
                        />
                    </div>
                    <div className="w-[45%] rounded-lg shadow-none bg-white border border-2 border-gray-400 flex-col py-5 px-10 space-y-2 min-h-[300px]">
                        <div className={`h-[40px] flex items-center text-xl font-semibold ${roleColor.textColor} mb-4`}>Info</div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Name:</div>
                            <div className="w-[65%] font-light">{name}</div>
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Address:</div>
                            <div className="w-[65%] font-light">{address}</div>
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Operating hours:</div>
                            <div className="w-[65%] font-light">{operatingHours}</div>
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Province:</div>
                            <div className="w-[65%] font-light">{province}</div>
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Postal Code:</div>
                            <div className="w-[65%] font-light">{postalCode}</div>
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Tel:</div>
                            <div className="w-[65%] font-light">{tel}</div>
                        </div>
                    </div>
                </div>
                :
                <form onSubmit={handleEditSubmit} className="flex flex-row w-[70%] justify-center space-x-10 mt-3 mb-5">
                    <div className="w-[55%] relative h-auto rounded-lg shadow-none bg-white border border-2 border-gray-400">
                        <Image
                            src={hospitalDetail.data.picture}
                            alt='Hospital Image'
                            layout='fill'
                            objectFit="cover"
                            objectPosition="bottom"
                            className="rounded-md"
                        />
                    </div>
                    <div className="w-[45%] rounded-lg shadow-none bg-white border border-2 border-gray-400 flex-col pt-5 pb-7  px-10 space-y-1 min-h-[300px]">

                        <div className="mb-4 flex flex-row items-center justify-between">
                            <div className={`text-xl font-semibold ${roleColor.textColor}`}>Edit Info</div>
                            <div className="h-[40px] flex flex-row items-center">
                                <button onClick={handleCancel} className="h-[70%] bg-red-500 rounded-lg w-[40px] flex flex-col items-center justify-center hover:bg-red-700">
                                    <CloseIcon sx={{ color: 'white', fontSize: '20px' }} />
                                </button>
                                <button type="submit" className="ml-5 h-[70%] bg-green-500 rounded-lg w-[40px] flex flex-col items-center justify-center hover:bg-green-700">
                                    <CheckIcon sx={{ color: 'white', fontSize: '20px' }} />
                                </button>
                            </div>
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Name:</div>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="Name"
                                variant="standard"
                                sx={{ width: '65%', '& .MuiInputBase-root': { padding: 0 }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: 'gray' } }}
                                required
                            />
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Address:</div>
                            <TextField
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                name="Address"
                                variant="standard"
                                sx={{ width: '65%', '& .MuiInputBase-root': { padding: 0 }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: 'gray' } }}
                                required
                            />
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Operating hours:</div>
                            <TextField
                                value={operatingHours}
                                onChange={(e) => setOperatingHours(e.target.value)}
                                name="OperatingHours"
                                variant="standard"
                                sx={{ width: '65%', '& .MuiInputBase-root': { padding: 0 }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: 'gray' } }}
                                required
                            />
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Province:</div>
                            <TextField
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                name="Province"
                                variant="standard"
                                sx={{ width: '65%', '& .MuiInputBase-root': { padding: 0 }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: 'gray' } }}
                                required
                            />
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Postal Code:</div>
                            <TextField
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                name="PostalCode"
                                variant="standard"
                                sx={{ width: '65%', '& .MuiInputBase-root': { padding: 0 }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: 'gray' } }}
                                required
                            />
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Tel:</div>
                            <TextField
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                name="Tel"
                                variant="standard"
                                sx={{ width: '65%', '& .MuiInputBase-root': { padding: 0 }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: 'gray' } }}
                                required
                            />
                        </div>
                        <div className="text-sm flex flex-row">
                            <div className="w-[35%] font-medium">Picture URL:</div>
                            <TextField
                                value={picture}
                                onChange={(e) => setPicture(e.target.value)}
                                name="Picture"
                                variant="standard"
                                sx={{ width: '65%', '& .MuiInputBase-root': { padding: 0 }, '& .MuiInputBase-input': { fontSize: '0.875rem', color: 'gray' } }}
                                required
                            />
                        </div>
                    </div>
                </form>
            }

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