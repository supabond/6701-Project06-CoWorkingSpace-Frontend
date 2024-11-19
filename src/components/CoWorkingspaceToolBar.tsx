'use client';

import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setEditState } from "@/redux/features/cowsEditSlice";
import deleteCoworkingspace from "@/libs/deleteCoworkingspace";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resetEditState } from "@/redux/features/cowsEditSlice";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";


export default function CoworkingspaceToolBar({ cid, token }: { cid: string, token: string }) {
    const cowsEdit = useAppSelector((state) => state.cowsEditSlice);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter(); // Initialize useRouter
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        const handleRouteChange = () => {
            dispatch(resetEditState());
        };

        handleRouteChange();

        return () => {
            handleRouteChange();
        };
    }, [dispatch]);

    const hoverEditClassName = cowsEdit.isEdit ? "hover:none" : "hover:underline";
    const hoverDeleteClassName = cowsEdit.isEdit ? "hover:none" : "hover:underline hover:text-red-600";

    const handleEditCoworkingSpace = async () => {
        if (!cowsEdit.isEdit) {
            dispatch(setEditState());
        }
    }

    const handleDeleteCoworkingSpace = async () => {
        try {
            // Delete coworking space
            const response = await deleteCoworkingspace(cid, token);
    
            // Ensure response is successful before proceeding
            if (response.success) {
                console.log('Coworkingspace deleted successfully');
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
                    // window.location.href = '/coworkingspace';

                } else {
                    console.error('Failed to revalidate:', revalidateResponse.statusText);
                }
            } else {
                console.error('Failed to delete coworking space:', response);
            }
        } catch (error) {
            console.error('Failed to delete or revalidate:', error);
        }
    };

    const handleOpenModal = () => {
        (!cowsEdit.isEdit) ? setShowModal(true): null;
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = () => {
        handleDeleteCoworkingSpace();
        handleCloseModal();
    };

    return (
        <main className="w-[70%] h-[10%] flex flex-row justify-end">
            <button onClick={handleEditCoworkingSpace} className={`text-base text-gray-500 font-light ${hoverEditClassName}`}>Edit</button>
            <div className="px-4 text-gray-500">|</div>
            <button onClick={handleOpenModal} className={`text-base text-gray-500 font-light ${hoverDeleteClassName}`}>Delete</button>
            <Dialog
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this coworking space?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseModal} color="primary" sx={{ textTransform: 'none' }}>
                    Cancel
                </Button>
                <Button onClick={handleConfirmDelete} color="primary" autoFocus sx={{ textTransform: 'none' }}>
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>

        </main>
    );
}