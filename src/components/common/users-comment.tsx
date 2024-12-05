'use client'

import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UserComments = ({userCommentData}: any) => {

    const router = useRouter();
    return (
        <div>
            <div className="flex flex-col md:flex-row items-start justify-start mt-10 md:mx-10 md:space-x-5">
                <Image  width={500} height={500} src={userCommentData.image_base64} alt="User" className="w-16 h-16 rounded-xl cursor-pointer" onClick={() => router.push(`/profile/${userCommentData.user_uid}`)} />
                <div className="flex flex-col items-start justify-start mt-10 md:mt-0">
                    <h1 className="text-xl text-normal">{userCommentData.fullName}</h1>
                    <p className="leading-normal text-normal mt-2">
                        {userCommentData.comment}
                    </p>
                    <p className="text-sm text-light mt-8">{format(parseISO(userCommentData.created_date), "MMMM d, yyyy HH:mm")}</p>
                </div>
            </div>
            <hr className="border-1 border-light w-11/12 mt-10 mx-auto" />
        </div>
    )
}

export default UserComments;