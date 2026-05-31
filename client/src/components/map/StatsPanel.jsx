import { useStats } from "@/hooks/useStats";

function StatsPanel() {
  const { countriesCount, continentsCount, totalPins } = useStats();

  return (
    <div
      id="stats-panel"
      className=" text-white flex max-[300px]:flex-wrap justify-center max-[300px]:gap-2 gap-10"
    >
      <div className="flex  items-center justify-center flex-col">
        <span className="">{totalPins} </span>
        <span className="text-xs text-atlas-amber"> pins</span>
      </div>
      <div className="flex items-center justify-center flex-col">
        <span className="">{countriesCount} </span>
        <span className="text-xs text-atlas-amber"> countries</span>
      </div>
      <div className="flex items-center justify-center flex-col">
        <span className="">{continentsCount} </span>
        <span className="text-xs text-atlas-amber">continents</span>
      </div>
    </div>
  );
}

export default StatsPanel;
