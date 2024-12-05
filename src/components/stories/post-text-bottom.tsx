'use client'

import { checkMainPost } from "@/lib/common-utils";
import Image from "next/image";

const PostTextOnBottom = ({ news, mainPostIndex, index }: any) => {

    const handleClick = () => {
        window.open(news.url, "_blank");
    }

    const colSpanClass = checkMainPost(index, mainPostIndex) ? 'col-span-1 md:col-span-2 row-span-2' : 'col-span-1 row-span-2';
    return (
        <>
            <div className={`p-1 flex flex-col ${colSpanClass} max-h-96 text-base items-center justify-start overflow-hidden`} onClick={handleClick}>
                <Image  width={500} height={500} className="bg-tertiary rounded-sm object-cover w-full h-2/3" src={news.urlToImage ? news.urlToImage : "/image.png"} alt="News" />
                <div className="w-full text-dark font-allerta my-2" >
                    <h1 className="font-extrabold capitalize">{news.title}</h1>
                    <h2 className="">{news.author}</h2>
                    <h3>{new Date(news.publishedAt).toDateString()}</h3>
                </div>
            </div>
        </>
    )
}

export default PostTextOnBottom;