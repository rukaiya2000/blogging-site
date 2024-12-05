'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

const Category = ({title}: any) => {

    const router = useRouter();
    return (
        <div className="relative w-full lg:w-1/5 h-96 m-2" onClick={() => router.push(`/${title.toLowerCase()}`)}>
            <Image  width={500} height={500} alt="Category" className="h-full w-full rounded-2xl" src={`/${title.toLowerCase()}.jpg`} />
            <p className="absolute bottom-0 left-0 w-full flex items-center justify-center text-4xl text-white my-4">{title}</p>
        </div>
    )
}

export default Category;