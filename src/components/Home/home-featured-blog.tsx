'use client'

import { processHtmlString } from "@/lib/common-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeFeaturedBlog = ({ blog }: any) => {

    const { firstParagraph } = processHtmlString(blog?.article ? blog.article : "");
    const router = useRouter();

    return (
        <div className="w-full relative ">
            {
                blog?.image_base64 ? (
                    <Image  width={500} height={500}  className="object-cover w-full h-60 md:h-128 lg:h-160 " src={blog?.image_base64} alt="Blog" />
                ) : (<Image  width={500} height={500}  className="object-contain w-full h-60 md:h-128 lg:h-160 bg-normal" src="/image.png" alt="Blog" />)
            }
            <div className="text-white absolute top-0 md:top-20 w-full h-3/5 lg:h-2/3 p-2 md:px-8 md:py-10 lg:py-2 lg:px-20">
                Featured
                <h1 className="text-xl w-full md:text-5xl lg:text-7xl font-semibold capitalize">{blog?.title}</h1>
                <p className="w-full mt-2 text-xs h-1/3 overflow-scroll md:h-fit md:text-base md:mt-10 no-scrollbar py-2 md:p-0">
                    {firstParagraph.replace(/<[^>]+>/g, '')}
                </p>
                <div className="w-fit border-2 text-xs md:text-base px-2 py-1 border-primary my-5 cursor-pointer" onClick={() => router.push(`/blogs/${blog?.docId}`)}>Read More</div>
            </div>
        </div>
    )
}

export default HomeFeaturedBlog;