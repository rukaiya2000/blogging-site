'use client'

import { useState } from "react";

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Contact = () => {

    const [name, setName] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [message, setMessage] = useState<any>("");

    return (
        <div className="flex items-center justify-center lg:mt-5 text-dark lg:p-0">
            <div className="relative bg-light h-160 md:h-96 w-full lg:w-2/3 rounded-lg flex items-start justify-start md:items-center">
                <div className="h-1/3 w-full md:h-3/4 md:w-1/3 p-5 mt-10 md:mt-0 bg-lighter absolute bottom-0 md:bottom-auto md:right-0 rounded-l-lg flex flex-col items-center justify-center text-center space-y-10">
                    <h1 className="text-5xl">Contact Us</h1>
                    <p>Feel Free to contact us any time, We will get back to you as soon as we can.</p>
                    <EmailOutlinedIcon />
                </div>
                <div className="w-full h-1/2 md:h-full md:w-1/2 bg-lighter md:mx-20 p-5 text-center space-y-5 flex items-center justify-center mt-10 md:mt-0">
                    <div className="w-full flex flex-col items-center">
                        <form className="w-full flex flex-col items-center">
                            <input
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                                type="text"
                                placeholder="Name"
                                className="w-3/4 outline-none bg-transparent border-b border-light m-2 p-2"
                            />
                            <input
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                type="email"
                                placeholder="Email"
                                className="w-3/4 outline-none bg-transparent border-b border-light m-2 p-2"
                            />
                            <input
                                value={message}
                                onChange={({ target }) => setMessage(target.value)}
                                type="text"
                                placeholder="Message"
                                className="w-3/4 outline-none bg-transparent border-b border-light m-2 p-2"
                            />
                        </form>
                        <button className="w-3/4 px-6 py-2 border border-normal text-dark rounded-lg mt-10">Send</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Contact;