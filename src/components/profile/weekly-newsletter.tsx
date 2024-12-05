const WeeklyNewsLetter = () => {
    return (
        <div className="w-full h-fit bg-light p-4 text-darker flex flex-col items-center justify-center text-center rounded-t-lg">
            <h1 className="text-3xl font-bold">Sign Up for our weekly newsletter</h1>
            <p className="my-5">Get more travel, inspiration, tips and exclusive offers sent straight to your inbox</p>
            <p>Email Address</p>
            <input className="w-3/4 h-10 rounded-md border-2 outline-none focus:border-tertiary my-5 p-2" type="email"/>
            <button className="mt-5 border-tertiary bg-dark p-2 rounded-sm text-white">Subscribe</button>
        </div>
    )
}

export default WeeklyNewsLetter;