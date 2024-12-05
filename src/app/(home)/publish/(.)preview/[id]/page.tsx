'use client'

import CategoryButton from '@/components/Home/category-button';
import { deleteBlogUsingDocumentId, fetchDocumentUsingDocumentId, updateData } from '@/lib/firebase/firebase-service';
import { processHtmlString } from '@/lib/common-utils';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Preview = ({ params }: {
    params: { id: string }
}) => {
    const Modal = useMemo(() => dynamic(() => import('@/app/@modal/modal'), { ssr: false }), []);

    const router = useRouter();

    const [blog, setBlog] = useState<any>(null);
    const [firstParagraph, setFirstParagraph] = useState<any>("");
    const [restOfParagraphs, setRestOfParagraphs] = useState<any>("");

    useEffect(() => {
        const fetchBlog = async () => {
            const blog = await fetchDocumentUsingDocumentId(params.id, "blogs")
            const { firstParagraph, restOfParagraphs } = processHtmlString(blog?.article);

            if (blog) {
                setBlog(blog);
                setFirstParagraph(firstParagraph);
                setRestOfParagraphs(restOfParagraphs);
            }
        }

        fetchBlog();
    }, [params.id])

    const handleReject = async () => {
        await deleteBlogUsingDocumentId(params.id);
        router.push('/');
    }

    const handlePublish = async () => {
        await updateData(params.id, { draft: false }, "blogs");
        router.push(`/blogs/${params.id}`);
    }

    return (
        <Modal>
            <div className="w-full m-2 flex flex-col items-center justify-center tracking-wider leading-loose no-scrollbar">
                <CategoryButton category={blog?.category} />
                <h1 className="text-5xl my-5 w-full lg:w-3/4 text-center leading-relaxed">{blog?.title}</h1>
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
                <div className='w-full lg:w-3/4 mt-10 px-4 md:p-0'>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: firstParagraph }} />
                </div>
                {
                    blog?.quotes ? (
                        <div className='w-full  md:w-2/3 lg:w-1/2 px-4 md:p-0 mt-10 font-bold capitalize italic'>
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
                        <Image width={500} height={500} src={blog?.image_base64} alt='Blog' className="w-full h-96 object-cover my-16" />
                    ) : (null)
                }
                <div className='w-full lg:w-3/4 px-4 md:p-0'>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: restOfParagraphs }} />
                </div>
                {
                    blog && blog.draft ? (
                        <div className="w-full lg:w-2/3 flex flex-col-reverse md:flex-row items-center justify-between mt-10">
                            <button className="w-full md:w-fit border-2 px-16 py-2 rounded-lg border-tertiary bg-tertiary outline-none bg-opacity-30 hover:bg-opacity-100 my-2" onClick={handleReject}>Reject</button>
                            <button className="w-full md:w-fit border-2 px-16 py-2 rounded-lg bg-secondary outline-none bg-opacity-30 hover:bg-opacity-100 my-2" onClick={() => router.push(`/publish/${params.id}`)}>Edit</button>
                            <button className="w-full md:w-fit border-2 px-16 py-2 rounded-lg border-green-200 bg-secondary outline-none bg-opacity-30 hover:bg-opacity-100 my-2" onClick={handlePublish}>Publish</button>
                        </div>
                    ) : (<div></div>)
                }
            </div>
        </Modal>
    )
}

export default Preview;
