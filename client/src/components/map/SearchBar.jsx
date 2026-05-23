import { Search, X } from "lucide-react";

function SearchBar({ search }) {
  const {
    handleOnSearchSubmit,
    handleClearSearch,
    handleOnSearchChange,
    handleSearchDropdown,
    text,
    searchLocations,
    errorMsg,
    showLoading,
  } = search;

  console.log(searchLocations);
  return (
    <div
      id="search-layer"
      className="fixed top-7 left-7  bg-white px-2 rounded-md"
    >
      <form onSubmit={handleOnSearchSubmit}>
        <div id="search-wrapper" className="relative flex items-center">
          <Search
            className=" w-4.5 h-4.5 text-gray-500 hover:text-atlas-indigo"
            strokeWidth={2.45}
          />
          <input
            type="text"
            placeholder="Search..."
            className=" px-2 py-1 outline-none"
            value={text}
            onChange={handleOnSearchChange}
          />
          {text.length > 0 && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="mx-1 cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
          {errorMsg && (
            <div
              id="error"
              className="absolute top-full width-full backdrop-blur-sm left-0 italic bold text-sm text-red-400 px-3 py-1 rounded-md shadow-md "
            >
              {errorMsg}
            </div>
          )}
          {!errorMsg && searchLocations.length > 0 && (
            <ul className="absolute top-full w-full left-0 text-sm bg-white rounded-md shadow-md">
              {searchLocations.map((searchLocation) => (
                <li
                  className="px-3 py-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                  key={searchLocation.mapboxId}
                  onClick={() => handleSearchDropdown(searchLocation.mapboxId)}
                >
                  {searchLocation.display}
                </li>
              ))}

              {showLoading && (
                <li className="flex items-center justify-end gap-2 px-2 py-2 text-xs text-gray-400">
                  <span className="h-2 w-2 animate-spin rounded-full border border-gray-400 border-t-transparent"></span>
                  Updating…
                </li>
              )}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
