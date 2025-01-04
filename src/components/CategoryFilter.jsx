import { useSelector, useDispatch } from "react-redux";
import { filterByCategory } from "../redux/videoActions";
import { useState } from "react";

function CategoryFilter() {
    const categories = useSelector((state) => state.video.categories);
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState(null); // State to track active category

    const handleCategoryClick = (category) => {
        setActiveCategory(category); // Set active category
        dispatch(filterByCategory(category));
    }

    return (
        <div className="flex flex-wrap gap-2 my-4">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-lg ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
