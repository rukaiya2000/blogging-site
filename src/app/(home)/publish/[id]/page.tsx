'use client'

import 'react-quill/dist/quill.snow.css';

import React, { useEffect, useMemo, useState } from 'react';
import { toolbarOptions } from '@/lib/quill.config';
import dynamic from 'next/dynamic';
import { fetchDocumentUsingDocumentId, saveBlogDetails, updateData } from '@/lib/firebase/firebase-service';
import useAuthListener from '@/lib/firebase/useAuthListener';
import { redirect, useRouter } from 'next/navigation';
import { toBase64 } from '@/lib/common-utils';
import { blogCategories } from '@/constants/text';

const WritingPad = ({ params }: any) => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

    const [article, setArticle] = useState('');
    const [title, setTitle] = useState('');
    const [quotes, setQuotes] = useState('');
    const [image, setImage] = useState<any>();
    const [category, setCategory] = useState("");
    const [docId, setDocId] = useState<any>(null);

    const [error, setError] = useState("");
    const [errorType, setErrorType] = useState("");

    const router = useRouter()

    const { user } = useAuthListener();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router])


    useEffect(() => {
        const fetchBlogUsingDocId = async () => {
            const blog = await fetchDocumentUsingDocumentId(params.id, "blogs");

            if (blog) {
                if (!blog.draft) router.push(`/blogs/${params.id}`);
                else {
                    setArticle(blog.article);
                    setTitle(blog.title);
                    setCategory(blog.category);
                    setQuotes(blog.quotes);
                    setDocId(params.id);
                }
            }
        }

        fetchBlogUsingDocId();
    }, [params.id, router])

    const modules = {
        toolbar: toolbarOptions
    }

    const handleClick = async (event: any, action: any) => {
        event.preventDefault();
        try {
            if (image && image.size > 512000) {
                setError("Image should be less that 500kb");
                setErrorType("IMAGE");
            } else if (title.length === 0) {
                setError("Required");
                setErrorType("TITLE");
            } else if (article.replace(/<[^>]+>/g, '').length === 0) {
                setError("Article Required");
                setErrorType("ARTICLE");
            } else if (category.length === 0) {
                setError("Required");
                setErrorType("CATEGORY");
            } else {
                const base64 = image ? await toBase64(image) : null;
                const data = {
                    article, title, quotes, draft: false, category
                };

                if (base64) Object.assign(data, { image_base64: base64 });

                if (action === "PUBLISH") {
                    await updateData(docId, data, "blogs");
                }
                if (docId) {
                    const route = action === "PREVIEW" ? `/publish/preview/${docId}` : `/blogs/${docId}`;
                    router.push(route);
                }
            }
        } catch (err) {
            console.log('error: ', err)
        }
    }

    return (
        <div className="w-full mx-auto my-8 flex flex-col-reverse lg:flex-row items-start justify-around p-2">
            <div className='flex items-center justify-between w-full mt-20 lg:mt-0 lg:hidden'>
                <button className='border-2 p-2 border-tertiary bg-secondary rounded-xl' onClick={(e) => handleClick(e, "PUBLISH")}>Publish</button>
                <button className='border-2 p-2 border-tertiary bg-secondary rounded-xl' onClick={(e) => handleClick(e, "PREVIEW")}>Preview</button>
            </div>
            <ReactQuill modules={modules} theme="snow" value={article} onChange={(value) => {
                setArticle(value);
                setError("");
                setErrorType("");
            }} className="bg-secondary border-none min-h-96 w-full lg:w-2/3  mt-6 lg:mt-0" />
            <div className="w-full lg:w-fit flex flex-col items-start justify-start space-y-10 p-6 lg:p-0">
                {
                    errorType === "ARTICLE" && error.length ? (
                        <h1 className='w-full text-left p-2 text-lg text-red-500'>{error}</h1>
                    ) : (<></>)
                }
                <div className='flex flex-col items-start justify-start w-full bg-light rounded-lg'>
                    <div className='w-full flex items-end justify-between'>
                        {
                            errorType === "TITLE" && error.length ? (
                                <h1 className='w-full text-left p-2 text-lg text-red-500'>{error}</h1>
                            ) : (<></>)
                        }
                        <h1 className='w-full text-right p-2 text-lg text-normal'>Title</h1>
                    </div>
                    <input className='mx-4 bg-secondary p-2 outline-none rounded-md w-full' type='text' value={title} onChange={({ target }) => {
                        setTitle(target.value);
                        setError("");
                        setErrorType("");
                    }} />
                </div>
                <div className='flex flex-col items-start justify-start w-full bg-light rounded-lg'>
                    <h1 className='w-full text-right p-2 text-lg text-normal'>Quotes</h1>
                    <input className='mx-4 bg-secondary p-2 outline-none rounded-md w-full' type='text' value={quotes} onChange={({ target }) => setQuotes(target.value)} />
                </div>
                <div className='flex flex-col items-start justify-start w-full bg-light rounded-lg'>
                    <div className='w-full flex items-end justify-between'>
                        {
                            errorType === "CATEGORY" && error.length ? (
                                <h1 className='w-full text-left p-2 text-lg text-red-500'>{error}</h1>
                            ) : (<></>)
                        }
                        <h1 className='w-full text-right p-2 text-lg text-normal'>Category</h1>
                    </div>
                    <select id="countries" value={category} onChange={({ target }) => {
                        setCategory(target.value);
                        setError("");
                        setErrorType("");
                    }} className="w-full mx-4 p-2 outline-none rounded-lg bg-secondary">
                        <option value="" disabled>Select a category</option>
                        {blogCategories.map(category => (
                            <option key={category} value={category} className='w-16'>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col items-start justify-start w-full bg-light rounded-lg'>
                    <div className='w-full flex items-end justify-between'>
                        {
                            errorType === "IMAGE" && error.length ? (
                                <h1 className='w-full text-left p-2 text-sm text-red-500'>{error}</h1>
                            ) : (<></>)
                        }
                        <h1 className='w-full text-right p-2 text-lg text-normal'>Image</h1>
                    </div>
                    <input className='mx-4 bg-secondary p-2 outline-none rounded-md w-full' aria-describedby="file_input_help" id="file_input" type="file" onChange={({ target }) => {
                        setImage(target.files?.[0]);
                        setError("");
                        setErrorType("");
                    }} />
                </div>
                <div className='hidden lg:flex items-center justify-between w-full'>
                    <button className='border-2 p-2 border-tertiary bg-secondary rounded-xl' onClick={(e) => handleClick(e, "PUBLISH")}>Publish</button>
                    <button className='border-2 p-2 border-tertiary bg-secondary rounded-xl' onClick={(e) => handleClick(e, "PREVIEW")}>Preview</button>
                </div>
            </div>
        </div>
    )
}

export default WritingPad;