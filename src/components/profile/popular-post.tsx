import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PopularPost = ({blog}: any) => {

    const router = useRouter();
    
    return (
        <div className="w-full flex items-center justify-center h-24 my-2 space-x-3" onClick={() => router.push(`/blogs/${blog.docId}`)}>
        <Image  width={500} height={500} src="/sports.jpg" alt='News' className="w-1/3 max-h-24 object-cover" />
        <div className="w-2/3">
            <p className="max-h-20 overflow-hidden">{blog.title}</p>
            <div className="flex items-start justify-start text-light space-x-2 my-2 text-sm">
                <AccessTimeIcon fontSize="inherit" />
                <p>{blog.published_date}</p>
                <p>83 views</p>
            </div>
        </div>
    </div>
    )
}

export default PopularPost;