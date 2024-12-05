import { fetchCategoryWiseStories } from "@/lib/third-party-data";
import Search from "@/components/common/search";
import PostTextOnBottom from "@/components/stories/post-text-bottom";

const Category = async ({ params }: any) => {

    const stories = await fetchCategoryWiseStories(30, "us", params.category)

    return (
        <div>
            <div className="flex flex-col items-center justify-center mx-auto">
                <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-20 lg:gap-x-10">
                    {
                        stories.map((topStory: any, index: any) => (
                            <PostTextOnBottom key={index} index={index + 1} news={topStory} mainPostIndex={[1, 9, 14, 19, 33]} />
                        ))
                    }
                </div>
                <div className="w-full mt-20">
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Category;