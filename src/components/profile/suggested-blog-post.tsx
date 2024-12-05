'use  client'

import { processHtmlString } from "@/lib/common-utils";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/media/socialIcons"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useRouter } from "next/navigation";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchQuery } from "@/lib/firebase/firebase-service";
import { useEffect, useState } from "react";
import Image from "next/image";

const SuggestedBlogPost = ({ blog }: any) => {
    const { firstParagraph } = processHtmlString(blog.article);
    const router = useRouter();
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        const fetchComment = async () => {
            const [comments] = await fetchQuery("blog_doc_id", blog.docId, "comments");
            if (comments && comments.comments) setTotalComments(comments.comments.length);
        }

        fetchComment();
    }, [blog.docId])
    return (
        <div className="w-full my-10">
            {
                blog.image_base64 ? (<Image  width={500} height={500} src={blog.image_base64} alt="Blog" className="w-full h-96 object-cover rounded-md" />)
                 : (<Image  width={500} height={500} src="/image.png" alt="Blog" className="w-full h-96 object-contain rounded-md" />) 
            }
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-2/5 flex items-center justify-around my-4 mt-10 uppercase">
                    <hr className="mx-2 bg-normal border-2 border-opacity-90 border-normal w-10" />
                    {blog.category}
                    <hr className="mx-2 bg-normal border-2 border-opacity-90 border-normal w-10" />
                </div>
                <h1 className="text-4xl text-center text-dark">
                    {blog.title}
                </h1>
                <hr className="border-t-2 border-dotted border-opacity-20 border-darker w-full my-5" />
                <div className="flex items-center justify-center space-x-2 text-sm">
                    <p className="text-light">By</p><p className="text-dark uppercase">{blog.author}</p>
                    <AccessTimeIcon fontSize="inherit" />
                    <p className="text-normal">{blog.published_date}</p>
                </div>
                <p className="my-5 text-center text-dark">
                    {firstParagraph.replace(/<[^>]+>/g, '')}
                </p>
                <div className="w-fit border-2 px-2 py-1 border-primary m-5 cursor-pointer" onClick={() => router.push(`/blogs/${blog.docId}`)}>Read More</div>
                <div className="w-full flex items-center justify-between">
                    <div className="w-1/3 flex justify-start space-x-4 my-5">
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
                    <div className="md:w-1/3 flex items-center justify-between">
                        <hr className="hidden md:block border-t border-solid border-black transform rotate-90 h-4 w-4" />
                        <div className="relative text-normal text-3xl mx-2 md:mx-0 md:text-5xl">
                            <FavoriteIcon fontSize="inherit" />
                            <div className="absolute h-1/2 w-1/2 bg-white right-0 top-0 rounded-full text-base flex items-center justify-center">{blog?.likedBy?.length}</div>
                        </div>
                        <div className="relative text-normal text-3xl mx-2 md:mx-0 md:text-5xl">
                            <ChatBubbleIcon fontSize="inherit" />
                            <div className="absolute h-1/2 w-1/2 bg-white right-0 top-0 rounded-full text-base flex items-center justify-center">{totalComments}</div>
                        </div>
                        <hr className="hidden md:block border-t border-solid border-black transform rotate-90 h-4 w-4" />
                    </div>
                    <div className="hidden md:block w-1/3 capitalize text-light tracking-wide text-right text-sm">
                        #fashion
                        #travel
                        #lifeStyle
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestedBlogPost