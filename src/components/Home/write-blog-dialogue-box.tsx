'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

const WriteBlogDialogueBox = () => {
    const router = useRouter();
    return (
        <div className="w-full flex items-center justify-around h-fit lg:rounded-r-full lg:bg-gradient-to-r from-dark to-black">
            <div className="lg:w-1/3 h-fit flex flex-col items-center p-4 rounded-xl border-2 border-tertiary border-opacity-25 border-dashed hover:border-opacity-75">
                <p className="text-base md:text-2xl text-normal text-center">Be a part of the narrative! Your voice matters in this digital space. Join us by contributing your thoughts, stories, and experiences. Let&apos;s create a diverse tapestry of ideas together. Ready to share your story? Start writing!</p>
                <div className="w-fit border-2 px-2 py-1 border-light m-5 cursor-pointer" onClick={() => router.push(`/publish`)}>Write a blog</div>
            </div>
            <div className="mx-5 hidden lg:flex ">
                <Image  width={500} height={500} src="/pen.png" alt="Pen" className="w-full h-128 object-cover rounded-full "/>
            </div>
        </div>
    )
}

export default WriteBlogDialogueBox;