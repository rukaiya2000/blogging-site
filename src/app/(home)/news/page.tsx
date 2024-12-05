import SocialMediaLinks from "@/components/common/social-media-links";
import TopFood from "@/components/stories/top-food";
import Weather from "@/components/stories/weather";
import TextOnImagePost from "@/components/stories/text-on-image-post";
import Category from "@/components/category";
import PostTextOnRight from "@/components/stories/post-text-right";
import Search from "@/components/common/search";
import PostTextOnBottom from "@/components/stories/post-text-bottom";

import { fetchCategoryWiseStories, fetchRandomFoodMeals } from "@/lib/third-party-data";
import { HorizontalLine } from "@/media/icons";

const getStories = async () => {
  const country = "US";
  try {
    let [topHeadlines, entertainmentStories, randomFood, sportsStories] = await Promise.all([
      fetchCategoryWiseStories(5, country.toLowerCase()),
      fetchCategoryWiseStories(7, country.toLowerCase(), "entertainment"),
      fetchRandomFoodMeals(),
      fetchCategoryWiseStories(5, country.toLowerCase(), "sports")]);

    return {
      topHeadlines,
      entertainmentStories,
      randomFood,
      sportsStories
    }
  } catch (error: any) {
    console.log("error: ", error);
    return {};
  }
}

export default async function Home() {

  const { topHeadlines, entertainmentStories, randomFood, sportsStories } = await getStories();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 p-2">
      <div className="col-span-6 my-5">
        <Search />
      </div >
      <div className="col-span-6 row-span-5 mx-5 -mt-16 md:-mt-28">
        {
          <div>
            <div className="mx-1 flex items-center justify-start">
              <h1 className="text-tertiary font-extrabold font-sans">Top Headlines</h1>
              <HorizontalLine />
            </div>
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-0.5`}>
              {
                topHeadlines.map((topStory: any, index: any) => (
                  <PostTextOnRight key={index} index={index + 1} news={topStory} mainPostIndex={[1]} combinedRequired={"true"} />
                ))
              }
            </div>
          </div>
        }
      </div>
      <div className="col-span-6 lg:col-span-1 row-span-5 p-1 my-5 ">
        <div className="flex flex-col items-center justify-center">
          <TopFood todayMeal={randomFood.meals[0]} />
          <Weather />
          <SocialMediaLinks />
        </div>
      </div>
      <div className="col-span-6 lg:col-span-3 row-span-5 my-5 ">
        {
          <div>
            <div className="mx-1 flex items-center justify-start">
              <h1 className="text-tertiary font-extrabold font-sans">Entertainment</h1>
              <HorizontalLine />
            </div>
            <div className={`grid grid-cols-2 gap-y-5`}>
              {
                entertainmentStories.map((topStory: any, index: any) => (
                  index !== 2 ? (<TextOnImagePost key={index} index={index + 1} news={topStory} mainPostIndex={[-1]} />) : (
                    <PostTextOnRight key={index} index={index + 1} news={topStory} mainPostIndex={[3]} combinedRequired={"true"} value={"true"} />
                  )
                ))
              }
            </div>
          </div>
        }
      </div>
      <div className="p-2 col-span-6 lg:col-span-2 row-span-6 my-5 ">
        {
          <div>
            <div className="mx-1 flex items-center justify-start">
              <h1 className="text-tertiary font-extrabold font-sans">Sports</h1>
              <HorizontalLine />
            </div>
            <div className={`grid grid-cols-2 gap-y-8`}>
              {
                sportsStories.map((topStory: any, index: any) => (
                  <PostTextOnBottom key={index} index={index + 1} news={topStory} mainPostIndex={[5]} />
                ))
              }
            </div>
          </div>
        }
      </div>
      <div className="p-2 col-span-6 lg:col-span-4 row-span-1 my-5 bg-secondary">
        <button className="text-primary w-full bg-tertiary opacity-70 hover:opacity-100 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-7 py-3.5">
          SPACE FOR ADVERTISEMENT
        </button>
      </div>
      <div className="col-span-6 row-span-2 my-5">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <Category title={"Business"} />
          <Category title={"Sports"} />
          <Category title={"World"} />
          <Category title={"Politics"} />
          <Category title={"Finance"} />
        </div>
      </div>
    </div >
  )
}
