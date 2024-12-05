import { HorizontalLine, VerticalLine } from "@/media/icons";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from "@/media/socialIcons";

const SocialMediaLinks = () => {
    return (
        <>
            <div className="flex items-center justify-start w-full mt-4">
                <h1 className="text-tertiary font-extrabold font-sans">Stay Connected</h1>
                <HorizontalLine />
            </div>
            <div className={`bg-facebook mt-2 w-full p-2 rounded-lg`}>
                <div className="flex items-center justify-between">
                    <div className="basis-1/2 flex items-center justify-around text-xs">
                        <FacebookIcon />
                        432K Likes
                    </div>
                    <div className="basis-1/2 text-sm flex items-center justify-end">
                        <VerticalLine />
                        Like Me
                    </div>
                </div>
            </div>
            <div className={`bg-twitter mt-2 w-full p-2 rounded-lg`}>
                <div className="flex items-center justify-between">
                    <div className="basis-1/2 flex items-center justify-around text-xs">
                        <TwitterIcon />
                        432K Follwers
                    </div>
                    <div className="basis-1/2 text-sm flex items-center justify-end">
                        <VerticalLine />
                        Follow Us
                    </div>
                </div>
            </div>
            <div className={`bg-instagram mt-2 w-full p-2 rounded-lg`}>
                <div className="flex items-center justify-between">
                    <div className="basis-1/2 flex items-center justify-around text-xs">
                        <InstagramIcon />
                        432K Follwers
                    </div>
                    <div className="basis-1/2 text-sm flex items-center justify-end">
                        <VerticalLine />
                        Follow Us
                    </div>
                </div>
            </div>
            <div className={`bg-linkedin mt-2 w-full p-2 rounded-lg`}>
                <div className="flex items-center justify-between">
                    <div className="basis-1/2 flex items-center justify-around text-xs">
                        <LinkedInIcon />
                        432K Follwers
                    </div>
                    <div className="basis-1/2 text-sm flex items-center justify-end">
                        <VerticalLine />
                        Follow Us
                    </div>
                </div>
            </div>
        </>
    )
}

export default SocialMediaLinks;