import { Menu, Dot } from "lucide-react";
import SearchBar from "./SearchBar";

function NavBar({ search }) {
  return (
    <>
      <div className="flex justify-between items-center gap-2 w-screen  px-5">
        <span className="flex-none text-white text-[clamp(1.375rem,3vw,2rem)] font-playfair tracking-widest">
          AtlasMe
        </span>
        <div className="max-[400px]:hidden">
          <SearchBar search={search} />
        </div>

        <Menu className="flex-none text-white" size={20} />
      </div>
    </>
  );
}

export default NavBar;
