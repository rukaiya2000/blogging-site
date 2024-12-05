import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SuggestedBlogCard = ({ blog }: any) => {
    const router = useRouter();
    return (
        <div className="w-full p-2 h-full flex flex-col items-center justify-center text-normal" onClick={() => router.push(`/blogs/${blog.docId}`)}>
            <Image width={500} height={500}  src={blog.image_base64} alt='Blog' className="w-full h-2/3 object-cover" />
            <div className="text-center flex flex-col justify-around w-4/5 h-1/3 mt-2">
                <div className='font-semibold text-dark'>
                    {blog.title}
                </div>
                <div className="flex items-center justify-center text-light space-x-2">
                    <AccessTimeIcon fontSize="small" />
                    <p>{blog.published_date}</p>
                </div>
            </div>
        </div>
    )
}

export default SuggestedBlogCard;