'use client'

import * as ROUTES from '@/constants/path';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { extractErrorMessage } from '@/lib/common-utils';
import { handlePasswordReset, signIn, signInWithGoogle } from '@/lib/firebase/auth-service';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SignIn = () => {

    const router = useRouter();
    const Modal = useMemo(() => dynamic(() => import('@/app/@modal/modal'), { ssr: false }), []);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event: any) => {
        event.preventDefault();
        try {
            await signIn(emailAddress, password);
            router.back();
        } catch (error: any) {
            setEmailAddress('');
            setPassword('');
            setError(extractErrorMessage(error.code));
        }
    }

    const handleSignInWithGoogle = async (event: any) => {
        try {
            await signInWithGoogle();
            router.back();
        } catch (error: any) {
            setError(extractErrorMessage(error.code));
        }
    }

    const handleForgotPassword = async () => {
        try {
            if (emailAddress && emailAddress.length) {
                await handlePasswordReset(emailAddress);
                alert("Email sent for password reset. Please check your email.");
                setEmailAddress('');
            } else {
                setError("Require Email Address")
            }
        } catch (error: any) {
            setError(extractErrorMessage(error.code));
        }
    }

    return (
        <Modal>
            <div className="flex flex-col lg:flex-row rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="m-auto bg-cover flex items-center justify-center">
                    <Image width={500} height={500} src="/logo.png" alt="logo" className='w-1/2 lg:w-2/3 object-cover' />
                </div>
                <div className="lg:w-3/4 m p-8">
                    <h2 className="text-2xl font-semibold text-dark text-center">Open Media</h2>
                    <p className="text-xl text-normal text-center">Sign In Page</p>
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
                        <h1 className="px-4 py-3 w-5/6 text-center text-dark font-bold">Sign in with Google</h1>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <button className="text-xs text-center text-normal uppercase">or login with email</button>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div className="mt-4">
                        <label className="block text-dark text-sm font-bold mb-2">Email Address</label>
                        <input className="bg-light text-dark focus:outline-none focus:shadow-outline border border-light rounded py-2 px-4 block w-full appearance-none" type="email" onChange={({ target }) => {
                            setEmailAddress(target.value);
                            setError('');
                        }} value={emailAddress} />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block text-dark text-sm font-bold mb-2">Password</label>
                            <button className="text-xs text-normal" onClick={handleForgotPassword}>Forget Password?</button>
                        </div>
                        <input className="bg-light text-dark focus:outline-none focus:shadow-outline border border-light rounded py-2 px-4 block w-full appearance-none" type="password" onChange={({ target }) => {
                            setPassword(target.value);
                            setError('');
                        }} value={password} />
                    </div>
                    {
                        error &&
                        <div className="mt-2 flex items-center justify-center">
                            <p className="text-center text-red-500">{error}</p>
                        </div>
                    }
                    <div className={`${error ? 'mt-4' : 'mt-8'}`}>
                        <button className={`bg-dark text-white font-bold py-2 px-4 w-full rounded ${isInvalid && 'opacity-50'} ${!isInvalid && 'hover:bg-normal'}`} onClick={handleLogin} disabled={isInvalid} type="submit">Login</button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <button className="text-xs text-normal uppercase">
                            <Link href={ROUTES.SIGNUP} className="font-bold text-blue-medium">
                                or Sign up
                            </Link>
                        </button>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SignIn;