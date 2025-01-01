import { useSelector, useDispatch } from "react-redux";
import { filterByCategory } from "../redux/videoActions";

function CategoryFilter(){
    const categories = useSelector((state) => state.video.categories);
    const dispatch = useDispatch()

const handleCategoryClick = (category) =>{
    dispatch(filterByCategory(category))
}


return (
    <div className="flex gap-2 my-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;