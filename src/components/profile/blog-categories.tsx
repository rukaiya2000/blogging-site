import Image from "next/image";
import CategoryButton from "../Home/category-button";

const BlogCategories = ({ sidebar, category }: { sidebar: boolean, category: string }) => {
    const heightAndWeight = sidebar ? "w-full max-h-28 md:max-h-44 lg:max-h-28" : "w-full max-h-28 md:max-h-44"
    return (
        <div className="relative w-full flex items-center justify-center my-2">
            <Image width={500} height={500}  src="/world.jpg" alt="Blog-Category" className={`${heightAndWeight} object-cover`} />
            <div className="absolute mx-auto bg-light bg-opacity-75">
                <CategoryButton category={category}/>
                {
                    sidebar ? (
                        <p className="text-center"> 4 Articles</p>
                    ) : (null)
                }
            </div>
        </div>
    )
}

export default BlogCategories;