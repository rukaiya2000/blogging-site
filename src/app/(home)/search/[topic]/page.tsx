import { processStories } from "@/lib/common-utils";
import { fetchStoriesRelatedToCurrentTopic } from "@/lib/third-party-data";
import Search from "@/components/common/search";
import PostTextOnBottom from "@/components/stories/post-text-bottom";
import PostTextOnRight from "@/components/stories/post-text-right";

const fetchStories = async (topic: string) => {
    const storiesRelatedToCurrentTopic = await fetchStoriesRelatedToCurrentTopic(50, topic);
    return processStories(storiesRelatedToCurrentTopic, 40);
}

const SearchTopic = async ({ params }: any) => {

    const storiesRelatedToCurrentTopic = await fetchStories(params.topic);

    return (
        <div className="flex flex-col items-center justify-center mx-auto">
            <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-y-20 lg:gap-x-10">
                {
                    storiesRelatedToCurrentTopic.map((topStory: any, index: any) => (
                        <PostTextOnBottom key={index} index={index + 1} news={topStory} mainPostIndex={[1, 9, 14, 19, 33]} combinedRequired={"true"} />
                    ))
                }
            </div>
            <div className="w-full mt-20">
                <Search />
            </div>
        </div>
    )
}

export default SearchTopic;