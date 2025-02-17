const Weather = () => {
    return (
        <div className="flex items-center justify-center w-full m-4">
            <div className="flex flex-col bg-white w-full rounded-md">
                <div className="font-bold text-xl">Sydney</div>
                <div className="text-sm text-normal">Thursday 10 May 2020</div>
                <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <svg className="w-32 h-32" fill="none" stroke="#D96666" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                </div>
                <div className="flex flex-row items-center justify-center mt-6">
                    <div className="font-medium text-6xl">24°</div>
                    <div className="flex flex-col items-center ml-6">
                        <div>Cloudy</div>
                        <div className="mt-1">
                            <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                            <span className="text-sm font-light text-normal">28°C</span>
                        </div>
                        <div>
                            <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                            <span className="text-sm font-light text-normal">20°C</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Wind</div>
                        <div className="text-sm text-normal">9k/h</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Humidity</div>
                        <div className="text-sm text-normal">68%</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Visibility</div>
                        <div className="text-sm text-normal">10km</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;