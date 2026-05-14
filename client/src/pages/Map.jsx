import GeoMap from "../components/map/GeoMap.jsx";
import SearchBar from "../components/map/SearchBar.jsx";
import { useSearch } from "../hooks/useSearch.jsx";

function Map() {
  const search = useSearch();

  return (
    <>
      <GeoMap searchResult={search.selectedLocation} />;
      <SearchBar search={search} />
    </>
  );
}

export default Map;
