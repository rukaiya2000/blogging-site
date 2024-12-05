'use client'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProfileFeaturedBlogSidebar = ({blog}: any) => {

    const router = useRouter();
    const [imgSrc, setImgSrc] = useState(blog.image_base64);

    return (
        <div className='w-full flex flex-col items-center'>
            <Image width={500} height={500}  src={imgSrc} alt='Blog' className="max-h-44 w-full object-cover mt-10" onError={() => setImgSrc("/image.png")} />
            <div className="w-2/5 flex items-center justify-around my-4">
                <hr className="mx-2 bg-normal border-2 border-opacity-90 border-normal w-10" />
                Fashion
                <hr className="mx-2 bg-normal border-2 border-opacity-90 border-normal w-10" />
            </div>
            <p className="text-center px-2 text-lg text-dark font-semibold tracking-wide">
                {blog?.title}
            </p>
            <div className="flex items-center justify-center text-light space-x-2 my-5 text-sm">
                <AccessTimeIcon fontSize="inherit" />
                <p>{blog?.published_date}</p>
            </div>
            <div className="w-fit border-2 px-2 py-1 border-primary m-2 cursor-pointer" onClick={() => router.push(`/blogs/${blog.docId}`)}>Read More</div>
        </div>
    )
}

export default ProfileFeaturedBlogSidebar;