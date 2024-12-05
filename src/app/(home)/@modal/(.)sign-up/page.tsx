'use client'

import * as ROUTES from '@/constants/path';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { extractErrorMessage } from '@/lib/common-utils';
import { createUser, doesEmailExists, signInWithGoogle } from '@/lib/firebase/auth-service';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SignUp = () => {
    const Modal = useMemo(() => dynamic(() => import('@/app/@modal/modal'), { ssr: false }), []);
    
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState('');
    const isInvalid = password === '' || emailAddress === '' || fullName === '';

    const handleSignUp = async (event: any) => {
        event.preventDefault();

        const emailExists = await doesEmailExists(emailAddress);

        if (!emailExists) {
            try {
                await createUser(emailAddress, password, fullName);
                router.push(ROUTES.DASHBOARD);
            } catch (error: any) {
                if (error.code.includes('email')) {
                    setEmailAddress('');
                    // setError(extractErrorMessage(error.code));
                    setErrorType("EMAIL");
                } else if (error.code.includes('password')) {
                    setPassword('');
                    setError(extractErrorMessage(error.code));
                    setErrorType("PASSWORD")
                } else {
                    setError("Something went wrong.");
                    setErrorType("GLOBAL");
                }
            }
        } else {
            setEmailAddress('');
            setError('Email Already Exists');
            setErrorType('EMAIL');
        }
    }

    const handleSignInWithGoogle = async (event: any) => {
        try {
            await signInWithGoogle();
            router.push(ROUTES.DASHBOARD);
        } catch (error: any) {
            setError(extractErrorMessage(error.code));
        }
    }

    return (
        <Modal>
            <div className="py-8">
                <div className="flex flex-col-reverse lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm md:max-w-xl lg:max-w-4xl">
                    <div className="lg:w-1/2 w-full p-8">
                        <h2 className="text-2xl font-semibold text-dark text-center">Open Media</h2>
                        <p className="text-xl text-normal text-center">Sign Up Page</p>
                        <div className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-lighter cursor-pointer" onClick={handleSignInWithGoogle}>
                            <div className="px-4 py-3">
                                <svg className="h-6 w-6" viewBox="0 0 40 40">
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#FFC107" />
                                    <path
                                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                        fill="#FF3D00" />
                                    <path
                                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                        fill="#4CAF50" />
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#1976D2" />
                                </svg>
                            </div>
                            <h1 className="px-4 py-3 w-5/6 text-center text-dark font-bold">Sign In with Google</h1>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <p className="text-xs text-center text-normal uppercase">or Sign Up with email</p>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between">
                                <label className="block text-dark text-sm font-bold mb-2">Full Name</label>
                            </div>
                            <input className="bg-light text-dark focus:outline-none focus:shadow-outline border border-light rounded py-2 px-4 block w-full appearance-none" onChange={({ target }) => setFullName(target.value)} value={fullName} />
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between">
                                <label className="block text-dark text-sm font-bold mb-2">Email Address</label>
                                <p className="text-xs text-red-500">{errorType === "EMAIL" && error}</p>
                            </div>
                            <input className="bg-light text-dark focus:outline-none focus:shadow-outline border border-light rounded py-2 px-4 block w-full appearance-none" type="email" onChange={({ target }) => {
                                setEmailAddress(target.value);
                                setError('');
                                setErrorType('');
                            }} value={emailAddress} />
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between">
                                <label className="block text-dark text-sm font-bold mb-2" >Password</label>
                                <p className="text-xs text-red-500">{errorType === "PASSWORD" && error}</p>
                            </div>
                            <input className="bg-light text-dark focus:outline-none focus:shadow-outline border border-light rounded py-2 px-4 block w-full appearance-none" type="password" onChange={({ target }) => {
                                setPassword(target.value);
                                setError('');
                                setErrorType('');
                            }} value={password} />
                        </div>
                        <div className="mt-8">
                            <button className={`bg-dark text-white font-bold py-2 px-4 w-full rounded ${isInvalid && 'opacity-50'} ${!isInvalid && 'hover:bg-normal'}`} onClick={handleSignUp} disabled={isInvalid} type="submit">Signup</button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4"></span>
                            <p className="text-xs text-normal uppercase">
                                <Link href={ROUTES.SIGNIN} className="font-bold text-blue-medium">
                                    or Sign In
                                </Link>
                            </p>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                    <div className="lg:w-1/2 m-auto bg-cover flex items-center justify-center">
                        <Image  width={500} height={500}  src="/logo.png" className='w-1/2 lg:w-2/3 object-cover' alt="logo" onClick={() => router.push(ROUTES.DASHBOARD)} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SignUp;