'use client'

import { signOut } from "firebase/auth";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { firebaseAuth } from "@/lib/firebase/firebase";
import useAuthListener from "@/lib/firebase/useAuthListener";
import Link from "next/link";
import * as ROUTES from "@/constants/path";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {

    const { user } = useAuthListener();

    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUserIsLoggedIn(true);
        } else {
            setUserIsLoggedIn(false);
        }
    }, [user])

    const handleSignOut = async () => {
        await signOut(firebaseAuth);
        router.push(ROUTES.DASHBOARD);
    }

    return (
        <header className="w-full h-16 flex-col py-2 z-50 fixed top-0 right-0 left-0 bg-darker opacity-85 text-lighter md:px-8">
            <div className="md:hidden text-2xl h-2/3 flex items-center justify-center capitalize" onClick={() => router.push(ROUTES.DASHBOARD)}>
                Open Media
            </div>
            <div className="hidden bg-darker opacity-85 text-white h-full md:flex items-center justify-between">
                <div onClick={() => router.push(ROUTES.DASHBOARD)} className="cursor-pointer hidden md:flex">
                    <Image width={500} height={500} src="/logo.png" className="mx-6 object-contain w-4 md:w-8 h-full bg-light bg-opacity-80 rounded-full" alt="Logo" />
                    Open Media
                </div>

                <div className="flex items-center justify-center">
                    <button className="m-6" onClick={() => router.push(ROUTES.DASHBOARD)}>Home</button>
                    <button className="m-6" onClick={() => router.push(`/news`)}>News</button>
                    <button className="m-6">About</button>
                    <button className="m-6" onClick={() => router.push(`/contact`)}>Contact Us</button>
                </div>
                {
                    userIsLoggedIn ? (
                        <div className="text-base md:text-xl lg:text-2xl flex justify-evenly">
                            <button className="m-1 md:m-2 lg:m-4" onClick={handleSignOut}><LogoutIcon fontSize="inherit" /></button>
                            <button className="m-1 lg:m-2" onClick={() => router.push(`/profile/${user.uid}`)}><PersonIcon fontSize="inherit" /></button>
                        </div>
                    ) : (
                        <div>
                            <Link href={ROUTES.SIGNIN}>
                                <button>Sign In</button>
                            </Link>
                        </div>
                    )
                }
            </div>
            <div className="md:hidden w-full fixed bottom-0 bg-darker text-lighter h-16 flex items-center justify-between text-xs p-0 m-0">
                <div className="border border-lighter h-full w-1/5 flex flex-col items-center justify-center cursor-pointer" onClick={() => router.push(ROUTES.DASHBOARD)}>
                    <HomeIcon fontSize="small" />
                    <button className="mt-2">Home</button>
                </div>
                <div className="border border-lighter h-full w-1/5 flex flex-col items-center justify-center cursor-pointer" onClick={() => router.push(`/news`)}>
                    <NewspaperIcon fontSize="small" />
                    <button className="mt-2">News</button>
                </div>
                <div className="border border-lighter h-full w-1/5 flex flex-col items-center justify-center cursor-pointer">
                    <InfoIcon fontSize="small" />
                    <button className="mt-2">About</button>
                </div>
                <div className="border border-lighter h-full w-1/5 flex flex-col items-center justify-center cursor-pointer" onClick={() => router.push(`/contact`)}>
                    <ContactSupportIcon fontSize="small" />
                    <button className="mt-2">Contact Us</button>
                </div>
                {
                    userIsLoggedIn ? (
                        <div className="border border-lighter h-full w-1/5 flex flex-col items-center justify-center cursor-pointer" onClick={() => router.push(`/profile/${user.uid}`)}>
                            <PersonIcon fontSize="small" />
                            <button>Profile</button>
                        </div>
                    ) : (
                        <div className="border border-lighter h-full w-1/5 flex flex-col items-center justify-center cursor-pointer" onClick={() => router.push(`/sign-in`)}>
                            <LoginIcon fontSize="small" />
                            <button className="mt-2">Sign In</button>
                        </div>
                    )
                }
            </div>
        </header>
    )
}

export default Header;