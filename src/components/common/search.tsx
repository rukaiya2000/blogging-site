'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {

    const [searchTopic, setSearchTopic] = useState("");
    const router = useRouter();

    const handleClick = (event: any) => {
        event.preventDefault();
        setSearchTopic("");
        router.push(`/search/${searchTopic}`)
    }

    return (
        <>
            <form>
                <div className="relative flex flex-col md:flex-row items-center justify-center my-8 lg:my-16">
                    <input type="search" id="default-search" className="block w-full lg:w-1/2 p-4 text-sm text-darker border outline-none border-light rounded-lg  focus:ring-secondary focus:border-tertiary m-2" value={searchTopic} onChange={({target}) => setSearchTopic(target.value)}/>
                    <button type="submit" className="text-primary bg-tertiary opacity-70 hover:opacity-100 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-7 py-3.5" onClick={handleClick}>Search</button>
                </div>
            </form>
        </>
    )
}

export default Search;