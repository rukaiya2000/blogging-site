'use client'

import { processHtmlString } from "@/lib/common-utils";
import CategoryButton from "../Home/category-button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const ProfileFeaturedBlog = ({blog}: any) => {
    const {firstParagraph} = processHtmlString(blog.article);
    const router = useRouter();
    const [imgSrc, setImageSrc] = useState(blog.image_base64)

    return (
        <div className="w-full lg:w-2/3 py-2 mt-10 lg:mt-0 lg:p-0 relative flex items-center justify-center h-128 ">
            <Image width={500} height={500}  src={imgSrc} alt="Blog" className="w-full h-full rounded-lg" onError={() => setImageSrc('/image.png')}/>
            <div className="text-white w-full lg:w-5/6 h-5/6 md:h-11/12 absolute left-0 bg-dark bg-opacity-50 rounded-lg lg:mx-5">
                <CategoryButton category={blog.category} />
                <h1 className="text-3xl font-medium mt-4 md:mt-10 mx-5">{blog.title}</h1>
                <p className="mx-5 my-2 h-1/5 overflow-scroll p-2 lg:h-fit lg:p-0 no-scrollbar">{firstParagraph.replace(/<[^>]+>/g, '')}</p>
                <div className="w-fit border-2 px-2 py-1 border-primary m-5 cursor-pointer" onClick={() => router.push(`/blogs/${blog.docId}`)}>Read More</div>
            </div>
        </div>
    )
}

export default ProfileFeaturedBlog;