'use client'

import HomeFeaturedBlog from "@/components/Home/home-featured-blog";
import TopBlogs from "@/components/Home/top-blogs";
import WriteBlogDialogueBox from "@/components/Home/write-blog-dialogue-box";
import { fetchFirstSetOfBlogs, fetchNextSetOfBlogs } from "@/lib/firebase/firebase-service";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { useEffect, useState } from "react";

const Home = () => {

  const [allBlogs, setAllBlogs] = useState<any>([]);
  const [currentLastVisible, setCurrentLastVisible] = useState<any>(null);
  const [allDataFetched, setAllDataFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const { firstBlogSet, lastVisible } = await fetchFirstSetOfBlogs(7);
      setAllBlogs([...allBlogs, ...firstBlogSet]);
      setCurrentLastVisible(lastVisible);
    }

    fetchAllBlogs();
  }, [])

  const handleLoadMore = async () => {
    const { nextSetOfBlogs, lastVisible } = await fetchNextSetOfBlogs(6, currentLastVisible);
    setAllBlogs([...allBlogs, ...nextSetOfBlogs]);
    if (!lastVisible || nextSetOfBlogs.length < 6) {
      setAllDataFetched(true);
    }
    setCurrentLastVisible(lastVisible);
  }

  return (
    <div className="flex flex-col items-center justify-center px-1 py-2 md:p-2">
      <div className="h-60 md:h-128 lg:h-160 w-full overflow-hidden rounded-xl">
        <HomeFeaturedBlog blog={allBlogs[0]} />
      </div>
      <div className="w-full px-2 py-6 md:px-10">
        <WriteBlogDialogueBox />
        <h1 className="text-xl md:text-2xl mt-8 lg:mt-0 text-normal">Recent blog posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 m-2 mt-5">
          {
            allBlogs.slice(1).map((blog: any, index: any) => (
              <TopBlogs key={index} blog={blog} />
            ))
          }
        </div>
        {
          allDataFetched ? (
            null
          ) : (
        <div className="w-full flex items-center justify-center mt-10 cursor-pointer" onClick={handleLoadMore}>
          <div className="px-2 py-1 bg-normal rounded-md text-lighter">Load More Blogs <ArrowDropDownOutlinedIcon fontSize="medium" /></div>
        </div>
        )
        }
      </div>
    </div>
  )
}

export default Home;