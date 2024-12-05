'use client'

import { checkMainPost } from "@/lib/common-utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TextOnImagePost = ({ news, index, mainPostIndex }: any) => {

    const handleClick = () => {
        window.open(news.url, "_blank");
    }
    const colSpanClass = checkMainPost(index, mainPostIndex) ? 'col-span-2 row-span-2 lg:max-h-96 text-base' : 'col-span-1 row-span-1 h-60 lg:max-h-48 text-sm';

    return (
        <>
            <div className={`relative p-1 ${colSpanClass} flex items-center justify-center overflow-hidden group`} onClick={handleClick}>
                <Link href={news.url} passHref={true} target="_blank" className="h-full w-full">
                    <Image width={500} height={500}  className="bg-tertiary rounded-sm object-cover w-full h-full " src={news.urlToImage ? news.urlToImage : "/image.png"} alt="News" />
                    <div className="absolute h-2/3 left-0 bottom-0 flex flex-col items-right justify-end m-4 text-white font-allerta" >
                        <h1 className="my-1 font-extrabold capitalize">{news.title}</h1>
                        <h2 className="my-1">{news.author}</h2>
                        {
                            checkMainPost(index, mainPostIndex) ? (
                                <>
                                    <h3>{new Date(news.publishedAt).toDateString()}</h3>
                                    <p className="my-2"> {news.description} </p>
                                </>
                            ) : (<></>)
                        }
                    </div>
                </Link>
            </div>
        </>
    )
}

export default TextOnImagePost;