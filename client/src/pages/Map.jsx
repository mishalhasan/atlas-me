import GeoMap from "../components/map/GeoMap.jsx";
import SearchBar from "../components/map/SearchBar.jsx";
import { useSearch } from "../hooks/useSearch.jsx";
import { usePins } from "@/hooks/usePins.jsx";
import NavBar from "@/components/map/NavBar.jsx";
import StatsPanel from "@/components/map/StatsPanel.jsx";
import Legend from "@/components/map/Legend.jsx";

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

      <GeoMap
        searchResult={search.selectedLocation}
        hideControls={search.searchLocations.length > 0}
      />
      ;
      <div className="fixed top-0 left-0 py-4 backdrop-blur-sm bg-black/5">
        <NavBar search={search} />
      </div>
      <div className="fixed left-1/2 -translate-x-1/2 pr-3 z-10 top-12 min-[400px]:hidden m-2 ">
        <SearchBar search={search} />
      </div>
      <div
        className="fixed bottom-14 sm:bottom-4 left-1/2 -translate-x-1/2 px-5 rounded-md pb-2 pt-1 bg-black/5  backdrop-blur-md 
                border border-white/10 shadow-lg max-[300px]:bottom-20"
      >
        <StatsPanel search={search} />
      </div>
      <div
        className="fixed bottom-2 right-2 px-4 py-2 rounded-md 
                bg-black/5 backdrop-blur-md 
                 shadow-lg text-white max-[300px]:bottom-10 max-[300px]:left-1/2 max-[300px]:-translate-x-1/2"
      >
        <Legend />
      </div>
    </>
  );
}

export default Map;
