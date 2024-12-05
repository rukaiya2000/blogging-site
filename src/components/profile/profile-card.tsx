'use client'

import { fetchQuery, updateData } from "@/lib/firebase/firebase-service";
import useAuthListener from "@/lib/firebase/useAuthListener";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/media/socialIcons";
import { introductionText } from "@/constants/text";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import { toBase64 } from "@/lib/common-utils";
import { ProfileImageAlt } from "@/media/icons";
import Image from "next/image";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase/firebase";
import * as ROUTES from "@/constants/path";

const ProfileCard = ({ uid }: { uid: string }) => {

    const { user } = useAuthListener();

    const [ownAccount, setOwnAccount] = useState(false);

    const [editingMode, setEditingMode] = useState(false);

    const [introduction, setIntroduction] = useState(introductionText)
    const [fullName, setFullName] = useState("Name");
    const [docId, setDocId] = useState("");
    const [image, setImage] = useState<any>();

    const router = useRouter();

    useEffect(() => {
        if (user && user.uid === uid) {
            setOwnAccount(true);
        }
    }, [user, uid]);

    useEffect(() => {
        const fetchUserData = async () => {
            const [profileUser] = await fetchQuery("userId", uid);
            setFullName(profileUser.fullName);

            setImage(profileUser.image_base64);
            if (profileUser?.introduction && profileUser?.introduction.length) {
                setIntroduction(profileUser.introduction);
            }
            setDocId(profileUser.docId);
        }
        fetchUserData();
    }, [uid]);

    const handleSaveClick = async () => {
        setEditingMode(false);
        const data = {
            introduction
        }
        if (image) Object.assign(data, { image_base64: image });
        await updateData(docId, data, "users");
    }

    const handleImageUpload = async (e: any) => {
        if (e.target.files?.[0]) {
            const image_base64 = await toBase64(e.target.files?.[0]);
            setImage(image_base64);
        }
    }

    const handleSignOut = async () => {
        await signOut(firebaseAuth);
        router.push(ROUTES.DASHBOARD);
    }

    return (
        <div className="w-full lg:w-80 h-128 relative bg-light text-center flex flex-col items-center justify-center p-2 rounded-xl">
            {
                ownAccount ? (
                    <div>
                        {
                            editingMode ? (
                                <div className="absolute top-0 right-0 m-2 rounded-lg text-dark cursor-pointer" onClick={handleSaveClick}>
                                    <DoneIcon fontSize="small" />
                                </div>) :
                                (<div className="absolute top-0 right-0 m-2 text-white rounded-lg cursor-pointer hover:text-dark" onClick={() => setEditingMode(!editingMode)}>
                                    <EditIcon fontSize="small" />
                                </div>)
                        }
                    </div>
                ) : (<div></div>)
            }
            <h1 className="text-base uppercase text-dark">About me</h1>
            {
                editingMode ? (
                    <>
                        <label htmlFor="dropzone-file">
                            {
                                image ? (
                                    <Image width={500} height={500} src={image} alt="User" className="border border-normal w-48 h-48 mt-8 rounded-full" />
                                ) : (
                                    <div className="w-48 h-48 rounded-full flex justfiy-center items-center">
                                        <ProfileImageAlt />
                                    </div>
                                )
                            }
                        </label>
                        <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </>
                ) : (
                    <>
                        {
                            image ? (
                                <Image width={500} height={500} src={image} alt="User" className="border border-normal w-48 h-48 mt-8 rounded-full" />
                            ) : (
                                <div className="w-48 h-48 rounded-full flex justfiy-center items-center">
                                    <ProfileImageAlt />
                                </div>
                            )
                        }
                    </>
                )
            }
            <h1 className="mt-6 text-dark text-lg font-bold">{fullName}</h1>
            {
                editingMode ? (<textarea
                    className="mt-4 h-32 text-dark border border-normal w-full bg-light outline-none  p-2 resize-none rounded-md no-scrollbar"
                    value={introduction}
                    onChange={({ target }) => setIntroduction(target.value)}
                    maxLength={150}
                />) : (
                    <p className="mt-4 text-dark">
                        {introduction}
                    </p>
                )
            }
            <div className="flex justify-between w-20 my-5">
                <button>
                    <FacebookIcon />
                </button>
                <button>
                    <TwitterIcon />
                </button>
                <button>
                    <InstagramIcon />
                </button>
            </div>
            {
                ownAccount ? (
                    <div className="md:hidden border border-tertiary text-darker hover:bg-tertiary hover:text-lighter h-8 px-6 rounded-full flex items-center justify-center cursor-pointer" onClick={handleSignOut}>
                        <LogoutIcon fontSize="small" />
                        <button>LogOut</button>
                    </div>
                ) : (null)
            }
        </div>
    )
}

export default ProfileCard;