import GeoMap from "../components/map/GeoMap.jsx";
import SearchBar from "../components/map/SearchBar.jsx";
import { useSearch } from "../hooks/useSearch.jsx";
import { usePins } from "@/hooks/usePins.jsx";
import { Spinner } from "@/components/ui/spinner.jsx";

function Map() {
  const search = useSearch();
  const { initialLoading } = usePins();

  return initialLoading ? (
    <div className="h-screen w-screen bg-atlas-map-bg flex flex-col items-center justify-center gap-3 select-none">
      <span className="text-white text-2xl font-playfair tracking-widest">
        AtlasMe
      </span>
      <span className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-500">
        Initializing Map Canvas
      </span>
      <div className="w-14 h-[2px] mt-1 bg-[#d4a843]/20 rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-[#4F46E5] rounded-full animate-pulse-line" />
      </div>
    </div>
  ) : (
    <>
      <GeoMap searchResult={search.selectedLocation} />;
      <SearchBar search={search} />
    </>
  );
}

export default Map;
