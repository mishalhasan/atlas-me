import { Map, ChartColumn, Sparkles, Menu, X, LogOut, Dot, HomeIcon, Home } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useStats } from "@/hooks/useStats";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
function MenuDrawer() {
  const { user, handleSignOut } = useAuth();
  const { countriesCount, totalPins } = useStats();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button className="bg-transparent hover:rounded-md hover:bg-white text-white hover:text-atlas-indigo ">
          <Menu className="flex-none " size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-[400px]:data-[vaul-drawer-direction=right]:w-full">
        <DrawerHeader className="border-b-1 border-gray-200">
          <div className="flex items-center gap-2.5 mt-5 ">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-atlas-amber/10 border-atlas-amber border">
              <span className="font-medium">
                {user.username[0].toLowerCase()}
              </span>
            </div>
            <div id="user" className="min-w-0">
              <DrawerTitle className="truncate max-w-[180px]">
                {user.username}
              </DrawerTitle>
              <div className="text-xs flex items-center max-[400px]:flex-col max-[400px]:items-start">
                <span className="flex gap-1 items-center">
                  {totalPins} pins
                </span>
                <Dot className="max-[400px]:hidden" size={16} />
                <span className="flex gap-1 items-center">
                  {countriesCount} countries
                </span>
              </div>
            </div>
          </div>

          <DrawerClose asChild>
            <Button className="fixed right-6 top-5 bg-transparent rounded-md w-fit cursor-pointer text-black hover:bg-gray-200">
              <X size={32} />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <nav
          id="main-nav"
          className="flex flex-col gap-4 justify-center items-start mt-5 ml-5"
        >
          <Link
            to="/"
            className={`flex items-center gap-2 ${location.pathname === "/" ? "text-atlas-indigo" : "text-foreground"}`}
            onClick={() => setOpen(false)}
          >
            <Home size={20} strokeWidth={1.5} />
            <span>Home</span>
          </Link>
          <Link
            to="/map"
            className={`flex items-center gap-2 ${location.pathname === "/map" ? "text-atlas-indigo" : "text-foreground"}`}
            onClick={() => setOpen(false)}
          >
            <Map size={20} strokeWidth={1.5} />
            <span>Map</span>
          </Link>
          <Link
            to="/stats"
            className={`flex items-center gap-2 ${location.pathname === "/stats" ? "text-atlas-indigo" : "text-foreground"}`}
            onClick={() => setOpen(false)}
          >
            <ChartColumn size={20} strokeWidth={1.5} />
            <span>Stats</span>
          </Link>
          <Link
            to="/captured"
            className={`flex pt-5 items-center gap-2 ${location.pathname === "/captured" ? "text-atlas-indigo" : "text-atlas-amber"}`}
            onClick={() => setOpen(false)}
          >
            <Sparkles size={20} strokeWidth={1.5} />
            <span>Captured</span>
          </Link>
        </nav>

        <DrawerFooter className="border-t-1 border-gray-200">
          <DrawerClose asChild>
            <Button
              //   className="border-atlas-indigo hover:bg-atlas-indigo hover:text-white"
              className="mr-auto "
              variant="ghost"
              onClick={handleSignOut}
            >
              <LogOut />
              Logout
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default MenuDrawer;
