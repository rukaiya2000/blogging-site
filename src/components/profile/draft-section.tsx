import DraftPost from "./draft-post";

const DraftSection = ({ drafts }: any) => {
    return (
        <div className="w-full lg:w-3/4 mt-10 border border-light p-2 md:p-6 lg:p-10 rounded-b-lg bg-light my-7">
            <h1 className="text-3xl text-center text-normal">Unleash your creativity, here&apos;s your draft—polish it, refine it, and let the world in on your thoughts. It&apos;s your stage, make it unforgettable!</h1>
            {
                drafts.map((draft: any, index: any) => (
                    <DraftPost key={index} draft={draft} />
                ))
            }
        </div>
    )
}

export default DraftSection;