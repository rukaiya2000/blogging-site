'use client'

import { processHtmlString } from "@/lib/common-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TopBlogs = ({ blog }: any) => {

    const router = useRouter();
    const {firstParagraph} = processHtmlString(blog?.article ? blog.article : "");

    return (
        <div className="flex flex-col items-start justify-start my-2 h-160" onClick={() => router.push(`/blogs/${blog?.docId}`)}>
            {
                blog?.image_base64 ? (
                    <Image  width={500} height={500} className="rounded-xl w-full h-80 object-cover" src={blog?.image_base64} alt="Blog" />
                ) : (
                    <Image  width={500} height={500} className="rounded-xl w-full h-80 object-contain" src="/image.png" alt="Blog" />
                )
            }
            <div className="my-4 h-60 flex flex-col items-start justify-between">
                <h1 className="mx-2 ">{blog?.title}</h1>
                <p className="mt-4 text-sm overflow-y-scroll p-2 no-scrollbar">{firstParagraph.replace(/<[^>]+>/g, '')}</p>
                <div className="w-full flex items-center justify-between mt-4">
                    <h4 className="mx-2">{blog?.author}</h4>
                    <h4 className="mx-2">{blog?.published_date}</h4>
                </div>
            </div>
        </div>
    )
}

export default TopBlogs;