'use client'

import BlogCategories from "@/components/profile/blog-categories";
import ProfileCard from "@/components/profile/profile-card";
import SuggestedBlogCard from "@/components/profile/suggested-blog-card";
import SuggestedBlogPost from "@/components/profile/suggested-blog-post";
import WeeklyNewsLetter from "@/components/profile/weekly-newsletter";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PopularPost from "@/components/profile/popular-post";
import MissingFeaturedStory from "@/components/common/missing-featured-story";
import { fetchQuery, getBlogsUsingUserUserUid } from "@/lib/firebase/firebase-service";
import { useEffect, useState } from "react";
import ProfileFeaturedBlog from "@/components/profile/profile-featured-blog";
import MissingSuggestedPanel from "@/components/profile/missing-suggested-panel";
import ProfileFeaturedBlogSidebar from "@/components/profile/profile-featured-blog-sidebar";
import DraftSection from "@/components/profile/draft-section";
import useAuthListener from "@/lib/firebase/useAuthListener";

const Profile = ({ params }: any) => {

    const { user } = useAuthListener();

    const [ownAccount, setOwnAccount] = useState(false);
    const [blogs, setBlogs] = useState<any>([]);
    const [drafts, setDrafts] = useState<any>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [featuredBlog, setFeaturedBlog] = useState<any>(null);

    useEffect(() => {
        if (user && user.uid === params.user_uid) {
            setOwnAccount(true);
        }
    }, [user, params.user_uid]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogsByUser = await getBlogsUsingUserUserUid(params.user_uid);
            const draftedBlogs = await fetchQuery("draft", true, "blogs");

            if (draftedBlogs.length) {
                setDrafts([...draftedBlogs]);
            }
            if (blogsByUser.length) {
                setFeaturedBlog(blogsByUser[0]);
                setCategories(blogsByUser.map((blog: any) => blog.category));
                setBlogs(blogsByUser.slice(1));
            }
        }
        fetchBlogs();
    }, [params.user_uid])

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:space-x-4 mt-4 lg:mt-10 p-4">
                {
                    featuredBlog ? (<ProfileFeaturedBlog blog={featuredBlog} />) : (<MissingFeaturedStory />)
                }
                <ProfileCard uid={params.user_uid} />
            </div>
            <div className="w-full my-10 grid md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
                {
                    blogs.length ? blogs.slice(0, 4).map((blog: any, index: any) => (
                        <SuggestedBlogCard key={index} blog={blog} />
                    )) : (<MissingSuggestedPanel />)
                }
            </div>
            <div className="w-full px-2 md:p-0 md:w-3/4">
                <WeeklyNewsLetter />
            </div>
            <div className="flex items-center justify-center p-2 md:p-4 lg:p-0">
                {
                    ownAccount && drafts.length ? (
                        <DraftSection drafts={drafts} />
                    ) : (<div></div>)
                }
            </div>
            <div className="w-full lg:w-3/4 md:h-44 my-10 flex flex-col md:flex-row items-center justify-between md:space-x-4 p-2 lg:p-0">
                {
                    categories.slice(0, 3).length ? categories.slice(0, 3).map((category: string, index: any) => (
                        <BlogCategories key={index} category={category} sidebar={false} />
                    )) : (
                        <div className="w-full h-full my-10 flex items-center justify-between space-x-4">
                            <BlogCategories category="Category" sidebar={false} />
                            <BlogCategories category="Category" sidebar={false} />
                            <BlogCategories category="Category" sidebar={false} />
                        </div>
                    )
                }
            </div>
            <div className="w-full lg:w-4/5 flex flex-col lg:flex-row items-start justify-center lg:space-x-10 p-2 lg:p-0">
                <div className="w-full lg:w-3/4 flex flex-col items-start justify-start md:p-4">
                    <div className="w-full flex items-center justify-start">
                        <div className="w-16 md:w-32 mx-5">
                            <hr className="mx-2 bg-normal border-2 border-opacity-30 border-normal w-full" />
                        </div>
                        <div className="w-full" >
                            <h4 className="text-light text-2xl italic">Discover</h4>
                            <h1 className="text-dark text-6xl">Our Stories</h1>
                        </div>
                    </div>
                    {
                        blogs.length ? blogs.map((blog: any, index: any) => (
                            <SuggestedBlogPost key={index} blog={blog} />
                        )) : (
                            <div className="w-full flex items-center justify-center">
                                <MissingSuggestedPanel />
                            </div>)
                    }
                    {
                        blogs.length ? (
                            <div className="w-full flex items-center justify-center mt-10">
                                <div className="px-2 py-1 bg-normal rounded-md text-lighter">Load More Blogs <ArrowDropDownOutlinedIcon fontSize="medium" /></div>
                            </div>
                        ) : (null)
                    }
                </div>
                <div className="w-full lg:w-1/4 flex flex-col items-center mt-10 lg:mt-0 sticky top-0">
                    <div className="w-full flex flex-col items-center justify-center space-y-5 text-base text-darker uppercase">
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-full" />
                        <h1>Featured Today</h1>
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-1/4" />
                    </div>
                    {
                        featuredBlog ? (<ProfileFeaturedBlogSidebar blog={featuredBlog} />) : (<div className="h-48" />)
                    }
                    <div className="w-full flex flex-col items-center justify-center space-y-5 text-base my-5 text-darker uppercase">
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-full" />
                        <h1>Categories</h1>
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-1/4" />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                        {
                            categories.slice(3, 6).length ? categories.slice(3, 6).map((category: string, index: any) => (
                                <BlogCategories key={index} category={category} sidebar={true} />
                            )) : (
                                <div className="w-full h-full my-10 flex items-center justify-between space-x-4">
                                    <BlogCategories category="Category" sidebar={true} />
                                </div>
                            )
                        }
                    </div>
                    <div className="w-full flex flex-col items-center justify-center space-y-5 text-base my-5 text-darker uppercase">
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-full" />
                        <h1>Latest Tweets</h1>
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-1/4" />
                    </div>
                    <p className="text-center p-2 text-light my-10">
                        Unlocking Tomorrow, Today: Feature Under Construction!
                        <br /> <br />
                        Stay tuned as we gear up to unveil something extraordinary. Our team is hard at work crafting a groundbreaking feature that will elevate your experience. The countdown has begun, and we can&apos;t wait to share this innovation with you. Get ready to witness the future—coming soon!
                    </p>
                    <div className="w-full flex flex-col items-center justify-center space-y-5 text-base my-5 text-darker uppercase">
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-full" />
                        <h1>Popular post</h1>
                        <hr className="bg-normal border-1 border-opacity-80 border-normal w-1/4" />
                    </div>
                    {
                        blogs.length ? blogs.slice(0, 3).map((blog: any, index: any) => (
                            <PopularPost key={index} blog={blog} />
                        )) : (<div />)
                    }
                    <div className="w-full mt-10">
                        <WeeklyNewsLetter />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;