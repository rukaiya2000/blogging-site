import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/media/socialIcons";

const Footer = () => {
    return (
        <>
            <footer className="h-40 flex items-center justify-center">
                <div className="flex flex-col items-center justify-between">
                    <div className="flex justify-between w-20 mt-4">
                        <button>
                            <FacebookIcon />
                        </button>
                        <button>
                            <TwitterIcon />
                        </button>
                        <button>
                            <InstagramIcon />
                        </button>
                    </div>
                    <div className="mt-12 text-center">© 2024 Rukaiya Khan. Crafted with precision and passion.</div>
                </div>
            </footer>
        </>
    )
}

export default Footer;