const CategoryButton = ({ category }: { category: string }) => {
    return (
        <div className="w-fit text-xs md:text-lg border-2 px-2 py-1 border-tertiary m-2 mt-10 font-bold tracking-widest uppercase">{category}</div>
    )
}

export default CategoryButton;