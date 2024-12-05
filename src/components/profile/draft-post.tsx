'use client'

import { processHtmlString } from "@/lib/common-utils";
import { useRouter } from "next/navigation";

const DraftPost = ({ draft }: any) => {
    const { firstParagraph } = processHtmlString(draft.article);
    const router = useRouter();
    return (
        <div className="mt-10 w-full border border-light bg-lighter rounded-xl p-4 text-dark">
            <h1 className="text-darker text-xl my-4">{draft.title}</h1>
            <p>
                {firstParagraph.replace(/<[^>]+>/g, '')}
            </p>
            <div className="w-full flex justify-end mt-4">
                <button className="py-2 px-6 rounded-lg border border-normal" onClick={() => router.push(`/publish/${draft.docId}`)}>Edit</button>
            </div>
        </div>
    )
}

export default DraftPost;