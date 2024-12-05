'use client'

import { useRouter } from "next/navigation";
import CategoryButton from "../Home/category-button";

const MissingFeaturedStory = () => {

    const router = useRouter();
    return (
        <div className="hidden lg:flex w-2/3 relative items-center justify-center h-128 rounded-lg border border-light">
            <div className="w-2/3 h-2/3 absolute left-0 bg-light bg-opacity-50 rounded-lg mx-5">
                <CategoryButton category={"CATEGORY"}/>
                <h1 className="text-3xl font-medium mt-10 mx-5">Chronicles of the Unseen: Your Blank Page, Your Story</h1>
                <p className="mx-5 my-2">In the absence of a post, an invitation emerges. Welcome to the blank canvas of imagination, where unwritten tales await discovery. Each missing entry is an opportunity for you to be the storyteller. Let your curiosity guide you through this uncharted terrain, where the allure of the unknown unveils hidden narratives. The adventure begins now—what stories will you unravel?</p>
                <div className="w-fit border-2 px-2 py-1 border-primary m-5 cursor-pointer" onClick={() => router.push(`/write`)}>Write</div>
            </div>
        </div>
    )
}

export default MissingFeaturedStory;