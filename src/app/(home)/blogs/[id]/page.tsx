'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { HorizontalLine, ProfileImageAlt } from '@/media/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CategoryButton from '@/components/Home/category-button';
import { fetchDocumentUsingDocumentId, fetchMostLikedBlog, fetchMostViewedBlog, fetchQuery, updateData } from '@/lib/firebase/firebase-service';
import { processHtmlString } from '@/lib/common-utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthListener from '@/lib/firebase/useAuthListener';
import CommentSection from '@/components/common/comment-section';
import Image from 'next/image';

const Blogs = ({ params }: {
    params: { id: string }
}) => {

    const { user } = useAuthListener();

    const [blog, setBlog] = useState<any>(null);
    const [firstParagraph, setFirstParagraph] = useState<any>(null);
    const [restOfParagraphs, setRestOfParagraphs] = useState<any>(null);
    const [userUid, setUserUid] = useState("");
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [authorDetails, setAuthorDetails] = useState<any>({});
    const [peoplesLovedBlog, setPoeplesLovedBlog] = useState<any>([]);
    const [mostLikedBlog, setMostLikedBlog] = useState<any>({});
    const [mostViewedBlog, setMostViewedBlog] = useState<any>({});
    const [firstRelatedBlogs, setFirstRelatedBlogs] = useState<any>([]);
    const [secondRelatedBlogs, setSecondRelatedBlogs] = useState<any>([]);
    const [totalRelatedBlogs, setTotalRelatedBlogs] = useState<number>(0);

    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUserUid(user.uid);
        }
    }, [user])

    useEffect(() => {
        const fetchBlog = async () => {
            const blog = await fetchDocumentUsingDocumentId(params.id, "blogs");
            const [[mostLikedBlog], [mostViewedBlog], relatedBlogs] = await Promise.all([
                fetchMostLikedBlog(blog?.user_id),
                fetchMostViewedBlog(blog?.user_id),
                fetchQuery("category", blog?.category, "blogs"),
                updateData(params.id, { views: blog?.views + 1 }, "blogs")])

            setMostLikedBlog(mostLikedBlog);
            setMostViewedBlog(mostViewedBlog);
            setFirstRelatedBlogs(relatedBlogs[0]);
            setSecondRelatedBlogs(relatedBlogs[1]);
            setTotalRelatedBlogs(relatedBlogs.length);

            const [authorDetails] = await fetchQuery("userId", blog?.user_id);
            const { firstParagraph, restOfParagraphs } = processHtmlString(blog?.article);

            setAuthorDetails(authorDetails);
            setFirstParagraph(firstParagraph);
            setRestOfParagraphs(restOfParagraphs);
            setBlog(blog);

            setPoeplesLovedBlog(blog?.likedBy);
            if (blog?.likedBy && user && blog?.likedBy.includes(user?.uid)) {
                setAlreadyLiked(true);
            }
        }

        fetchBlog();
    }, [params.id, user]);

    const handleLike = async (event: any, action: string) => {
        event.preventDefault();

        const dataToBeUpdated = {};
        if (action === "UNLIKE") {
            const updatedLikedByList = blog?.likedBy.filter((uid: string) => uid !== userUid);
            Object.assign(dataToBeUpdated, {
                likedBy: [...updatedLikedByList]
            })
            setPoeplesLovedBlog(updatedLikedByList);
        } else if (action === "LIKE") {
            const likedBy = [...blog.likedBy, userUid];

            setPoeplesLovedBlog(likedBy);
            Object.assign(dataToBeUpdated, {
                likedBy
            })
        }

        setAlreadyLiked(!alreadyLiked);
        await updateData(params.id, dataToBeUpdated, "blogs");
    }

    return (
        <div className="w-full min-h-screen my-2 mt-4 md:mt-10 lg:mt-20 flex flex-col items-center justify-center tracking-wider leading-loose px-4 md:p-0">
            <CategoryButton category={blog?.category} />
            <h1 className="text-xl md:text-5xl my-2 md:my-5 w-full lg:w-3/4 p-2 text-center leading-relaxed">{blog?.title}</h1>
            <div className="flex items-center justify-center uppercase md:my-2">
                <h3 className="m-1 text-xs md:text-base md:m-2">
                    <span className="text-light mx-2">
                        by
                    </span>
                    <b>
                        {blog?.author}
                    </b>
                </h3>
                <span className="md:m-2 text-light">/</span>
                <h3 className="m-1 text-xs md:text-base md:m-2 text-light">{blog?.published_date}</h3>
                <span className="md:m-2 text-light">/</span>
                <h3 className="m-1 text-xs md:text-base md:m-2 text-light"> 2 MIN READ</h3>
            </div>
            <div className='w-full md:w-11/12 lg:w-3/4 p-2 mt-10'>
                <div className="prose max-w-none leading-relaxed md:leading-loose" dangerouslySetInnerHTML={{ __html: firstParagraph }} />
            </div>
            {
                blog?.quotes ? (
                    <div className='w-full md:w-2/3 lg:w-1/2 mt-10 font-bold capitalize italic p-4'>
                        <svg className="w-8 h-8 text-light mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <blockquote>
                            {blog?.quotes}
                        </blockquote>
                    </div>
                ) : (<div></div>)
            }
            {
                blog?.image_base64 ? (
                    <Image width={500} height={500} src={blog?.image_base64} className="w-full h-48 md:h-96 object-cover my-8 md:my-16 p-2 md:p-0" alt="blog" />
                ) : (null)
            }
            <div className='w-full md:w-11/12 lg:w-3/4 p-2 mt-10'>
                <div className="prose max-w-none leading-relaxed md:leading-loose" dangerouslySetInnerHTML={{ __html: restOfParagraphs }} />
            </div>
            <div className='w-3/4 my-12 uppercase flex flex-col items-center justify-center'>
                <div className='w-full flex items-center justify-center p-2 mb-2'>
                    <HorizontalLine />
                    <Image width={500} height={500} src={authorDetails?.image_base64} className='w-16 h-16 object-cover rounded-full cursor-pointer' onClick={() => router.push(`/profile/${blog?.user_id}`)} alt='Author' />
                    <HorizontalLine />
                </div>
                <h1>{authorDetails?.fullName}</h1>
            </div>
            <div className='uppercase flex flex-col items-center justify-center'>
                {
                    userUid ? (
                        <div>
                            {
                                alreadyLiked ? (
                                    <button className='bg-tertiary rounded-3xl px-4 py-2 flex justify-center items-center mb-8 text-primary space-x-2' onClick={(e) => handleLike(e, "UNLIKE")}>
                                        <FavoriteIcon fontSize="small" />
                                        <p>UNLIKE</p>
                                    </button>) : (
                                    <button className='bg-tertiary rounded-3xl px-4 py-2 flex justify-center items-center mb-8 text-primary space-x-2' onClick={(e) => handleLike(e, "LIKE")}>
                                        <FavoriteBorderIcon fontSize="small" />
                                        <p>LIKE THIS</p>
                                    </button>
                                )
                            }
                        </div>
                    ) : (<div></div>)
                }
                {
                    peoplesLovedBlog?.length ? (
                        <p className="text-light text-sm">{peoplesLovedBlog.length} people loved this </p>) : (
                        <p className="text-light text-sm">Be First person to love this. </p>)
                }

            </div>
            <div className="mt-16 w-full lg:w-2/3 md:p-4 h-auto">
                <CommentSection blogDocId={params.id} />
            </div>
            <div className="w-full lg:h-128 flex flex-col-reverse lg:flex-row items-center justify-center bg-blue-200 text-white mt-20">
                <div className="relative text-center h-128 lg:h-full w-full lg:w-1/4 cursor-pointer" onClick={() => router.push(`/profile/${blog?.user_id}`)}>
                    {
                        authorDetails?.image_base64 ? (
                            <Image width={500} height={500} src={authorDetails?.image_base64} className='w-full h-128 object-cover' alt='Author' />
                        ) : (
                            <div className="w-full h-full rounded-full flex justfiy-center items-center">
                                <ProfileImageAlt />
                            </div>
                        )
                    }
                    <div className="absolute top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center font-bold space-y-8 bg-lighter bg-opacity-70 text-dark">
                        <div className="border-2 px-2 py-1 border-white my-2 font-bold tracking-widest">TRAVELLING</div>
                        <div className="capitalize w-full text-xl flex items-center justify-center text-center">
                            {authorDetails?.introduction ?? ""}
                        </div>
                        <div>
                            {authorDetails?.fullName}
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center space-y-10 bg-white text-light h-128 lg:h-full w-full lg:w-1/4">
                    <div className='text-center space-y-3 flex flex-col items-center cursor-pointer' onClick={() => router.push(`/blogs/${mostLikedBlog.docId}`)}>
                        <FavoriteIcon fontSize='small' />
                        <h3 className='uppercase text-sm'>Most Popular</h3>
                        <h1 className='capitalize text-xl font-bold text-dark w-3/4 lg:w-full'>{mostLikedBlog.title}</h1>
                    </div>
                    <HorizontalLine />
                    <div className='text-center space-y-3 flex flex-col items-center cursor-pointer' onClick={() => router.push(`/blogs/${mostViewedBlog.docId}`)}>
                        <VisibilityIcon fontSize='small' />
                        <h3 className='uppercase text-sm'>Most Viewed</h3>
                        <h1 className='capitalize text-xl font-bold text-dark w-3/4 lg:w-full'>{mostViewedBlog.title}</h1>
                    </div>
                </div>
                <div className="relative flex items-center justify-center h-128 lg:h-full w-full lg:w-1/4">
                    <Image width={500} height={500} src='/world.jpg' className='w-full h-128 object-cover' alt='Category' />
                    <div className="absolute top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center font-bold space-y-4">
                        <h1 className='capitalize text-5xl font-bold'>#{blog?.category}</h1>
                        <h3 className='capitalize text-2xl font-bold' >{totalRelatedBlogs} posts</h3>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center space-y-6 lg:space-y-10 bg-white text-light h-128 lg:h-full w-full lg:w-1/4">
                    <h1 className='capitalize text-xl font-bold text-light -mt-10'>Related Post</h1>
                    <div className='text-center space-y-3 flex flex-col items-center' onClick={() => router.push(`/blogs/${firstRelatedBlogs?.docId}`)}>
                        <h1 className='capitalize text-xl font-bold text-dark w-4/5 lg:w-full'>{firstRelatedBlogs?.title}</h1>
                        <h2>{firstRelatedBlogs?.author}</h2>
                    </div>
                    <HorizontalLine />
                    <div className='text-center space-y-3 flex flex-col items-center cursor-pointer' onClick={() => router.push(`/blogs/${secondRelatedBlogs?.docId}`)}>
                        <h1 className='capitalize text-xl font-bold text-dark w-4/5 lg:w-full'>{secondRelatedBlogs?.title}</h1>
                        <h2>{secondRelatedBlogs?.author}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs;
