'use client'

import { fetchParticularDocuments, fetchQuery, saveCommentDetails, updateData } from '@/lib/firebase/firebase-service';
import useAuthListener from '@/lib/firebase/useAuthListener';
import { CommentIcon } from '@/media/icons';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from 'react';
import UserComments from './users-comment';
import { cloneDeep, keyBy } from 'lodash';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CommentSection = ({ blogDocId }: { blogDocId: string }) => {

    const [commentData, setCommentData] = useState<any>(null);
    const [userComment, setUserComment] = useState<string>("");
    const [commentDataDocId, setCommentDataDocId] = useState<string>("");
    const [totalPages, setTotalPages] = useState<any>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentAndUserData, setCommentAndUserData] = useState<any>([]);
    const [currentAuthUser, setCurrentAuthUser] = useState<any>(null);
    const [commentButtonEnabled, setCommentButtonEnabled] = useState(false);

    const router = useRouter();

    const { user } = useAuthListener();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (user) {
                const [currentUser] = await fetchQuery("userId", user.uid);
                setCurrentAuthUser(currentUser);
                setCommentButtonEnabled(true);
            }
        }

        fetchCurrentUser();
    }, [user])

    useEffect(() => {
        const fetchComment = async () => {
            const [commentData] = await fetchQuery("blog_doc_id", blogDocId, "comments");
            if (commentData) {
                setCommentData(commentData);
                setCommentDataDocId(commentData.docId);
                const userUids = commentData.comments.map((comment: any) => comment.user_uid);

                if (userUids.length) {
                    let userData: any = await fetchParticularDocuments("userId", userUids, "users");
                    userData = keyBy(userData, "userId");
                    const commentAndUserData = cloneDeep(commentData).comments.map((comment: any) => Object.assign(comment, {
                        image_base64: userData[comment.user_uid].image_base64,
                        fullName: userData[comment.user_uid].fullName
                    }));

                    setCommentAndUserData(commentAndUserData);
                }
                setTotalPages(Math.ceil(commentData.comments.length / 2));
            }
        }

        fetchComment();
    }, [blogDocId]);

    const handleCommentButton = async (event: any) => {
        event.preventDefault();
        setCommentButtonEnabled(false);
        const data = {
            comments: [
                {
                    user_uid: user.uid,
                    comment: userComment,
                    created_date: new Date().toISOString()
                }, ...commentData.comments]
        }

        setCommentAndUserData([{
            user_uid: user.uid,
            comment: userComment,
            created_date: new Date().toISOString(),
            image_base64: currentAuthUser.image_base64,
            fullName: currentAuthUser.fullName
        }, ...commentAndUserData,])
        setCommentData(Object.assign(commentData, {
            comments: data.comments
        }))
        setTotalPages(Math.ceil(data.comments.length / 2));
        setUserComment("");
        await updateData(commentDataDocId, cloneDeep(data), "comments");
        setCommentButtonEnabled(true);
    }

    const handleNextCommentPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevCommentPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-end justify-end">
                <hr className="border-2 border-light w-10" />
                <div className="px-6 py-2 border-t-4 border-r-4 border-l-4 border-light rounded-t-lg flex items-center justify-center ">
                    <CommentIcon />
                    <h1 className='mx-2'>Comments</h1>
                </div>
                <hr className="border-2 border-light w-full" />
            </div>
            {
                commentAndUserData.slice(currentPage * 2 - 2, currentPage * 2).map((data: any, index: any) => (
                    <UserComments key={index} userCommentData={data} />
                ))
            }
            <div className='flex items-center justify-end p-4'>
                <div className='flex space-x-3'>
                    <button className='flex items-center justify-center cursor-pointer' disabled={totalPages === 0} onClick={handlePrevCommentPage}>
                        <ArrowLeftIcon />
                    </button>
                    <div className='flex items-center justify-center space-x-3'>
                        {
                            totalPages === 0 ? (<h1>0</h1>) : (
                                Array.from({ length: totalPages }, (_, index) => (
                                    <h1 key={index + 1}>{index + 1}</h1>
                                )))
                        }
                    </div>
                    <button className='flex items-center justify-center cursor-pointer' disabled={totalPages === 0} onClick={handleNextCommentPage}>
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>
            <hr className="border-1 border-light w-full mx-auto" />
            {
                currentAuthUser ? (
                    <div className='w-full flex flex-col md:flex-row items-start justify-center my-5 md:space-x-5 space-y-2 md:space-y-0 px-2'>
                        <Image  width={500} height={500} src={currentAuthUser?.image_base64} alt="User" className="w-16 h-16 rounded-xl cursor-pointer" onClick={() => router.push(`/profile/${user.uid}`)} />
                        <textarea
                                value={userComment}
                                onChange={({ target }) => setUserComment(target.value)}
                                className="h-28 text-light border border-light w-full md:w-2/3 bg-lighter outline-none p-4 resize-none rounded-md no-scrollbar" />
                        <button className='bg-light text-dark p-2 rounded-lg' onClick={handleCommentButton} disabled={!commentButtonEnabled}>Add a Comment</button>
                    </div>
                ) : (null)
            }
            <hr className="border-2 border-normal w-full mx-auto mt-10" />
        </div>
    )
}

export default CommentSection;
