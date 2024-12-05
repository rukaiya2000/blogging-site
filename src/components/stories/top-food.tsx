import { HorizontalLine } from "@/media/icons";
import Image from "next/image";

const TopFood = ({ todayMeal }: any) => {

    return (
        <div className="relative h-full">
            <div className="flex items-center justify-start">
                <h1 className="text-tertiary font-extrabold font-sans">Top Food</h1>
                <HorizontalLine />
            </div>
            <Image width={500} height={500}  className="bg-tertiary rounded-sm object-cover w-full h-full" src={todayMeal.strMealThumb} alt="food" />
            <div className="font-extrabold capitalize m-1 absolute right-0 left-0 bottom-0 flex items-center justify-center text-white font-allerta" >
                {todayMeal.strMeal}
            </div>
        </div>
    )
}

export default TopFood;