'use client'

import { checkMainPost } from "@/lib/common-utils";
import Image from "next/image";

const PostTextOnRight = ({ news, mainPostIndex, index }: any) => {

    const handleClick = () => {
        window.open(news.url, "_blank");
    }
    return (
        <>
            {
                checkMainPost(index, mainPostIndex) ? (
                    <div className={`p-1 flex flex-col col-span-2 row-span-2 lg:max-h-96 text-base items-center justify-start overflow-hidden`} onClick={handleClick}>
                        <Image  width={500} height={500} className="bg-tertiary rounded-sm object-cover w-full h-2/3" src={news.urlToImage ? news.urlToImage : "/image.png"} alt="News" />
                        <div className="w-full text-dark font-allerta my-2" >
                            <h1 className="font-extrabold capitalize">{news.title}</h1>
                            <h2 className="">{news.author}</h2>
                            <h3>{new Date(news.publishedAt).toDateString()}</h3>
                            <p className="my-2"> {news.description} </p>
                        </div>
                    </div>
                ) : (
                    <div className={`p-1 flex col-span-2 lg:col-span-1 row-span-1 max-h-48 text-xs items-center justify-start overflow-hidden`} onClick={handleClick}>
                        <Image width={500} height={500}  className="bg-tertiary rounded-sm object-cover w-1/2 h-full" src={news.urlToImage ? news.urlToImage : "/image.png"} alt="News" />
                        <div className="m-1 h-full flex flex-col justify-end text-dark font-allerta leading-relaxed" >
                            <h1 className="font-extrabold capitalize h-44 overflow-hidden">{news.title}</h1>
                            <h2 className="">{news.author}</h2>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default PostTextOnRight;