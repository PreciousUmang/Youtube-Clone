import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterVideos } from "../redux/videoActions";

function SearchBar(){

    const [query, setQuery] = useState('')
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setQuery(e.target.value);
        dispatch(filterVideos(e.target.value))
    }
    return (
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search videos..."
          className="border-gray-300 p-2 border rounded-lg w-1/2"
        />
      );
}

export default SearchBar;