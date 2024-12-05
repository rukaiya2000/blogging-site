'use client'

import { useRouter } from "next/navigation";
import * as React from 'react';
import { createPortal } from "react-dom";
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const dialogRef = React.useRef(null);

    React.useEffect(() => {
        // @ts-ignore
        if (!dialogRef.current?.open) {
            // @ts-ignore
            dialogRef.current?.showModal();
        }
    }, []);

    const onDismiss = () => {
        router.back();
    }

    return createPortal(
        <div className="flex justify-center items-center z-50">
            <dialog ref={dialogRef} className="bg-white border-none rounded-3xl px-2 md:px-10 py-4 relative flex items-start justify-center " onClose={(onDismiss)}>
                {children}
                <button onClick={onDismiss} className="absolute top-0 right-0 w-12 h-12 border-none rounded-2xl cursor-pointer flex items-center justify-center">
                    <CloseIcon />
                </button>
            </dialog>
        </div>,
        document.getElementById('modal-root')!
    )
} 
