import { useParams } from "react-router-dom";
import { useCaptured } from "@/hooks/useCaptured";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";
import MarkerPin from "../components/map/pins/MarkerPin";
import { getUniqueCountries, getEmojiFlag } from "../utils/helper";
import { countries } from "countries-list";
import { Dot, Share, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card.jsx";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

function Captured() {
  const { username } = useParams();
  const { loading, error, pins, stats, mapRef, copyShareLink } =
    useCaptured(username);

  if (error) {
    return (
      <div className="min-h-screen flex items-center px-2 justify-center text-base select-none bg-atlas-amber/10">
        Something went wrong. Please try again later.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-atlas-amber/10">
        <div className="flex flex-col items-center gap-3 text-base">
          <Spinner />
          <span className="text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-atlas-amber/10 w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(212,168,67,0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(212,168,67,0.15) 1px, transparent 1px)
      `,
        // backgroundSize: "150px 150px",
        backgroundSize: "150px 170px",
      }}
    >
      {/* [@media(max-width:420px)]:rounded-sm min-w-[420px]:max-h[95dvh]
      overflow-hidden sm:max-h-[90dvh] */}
      <Card className="w-[100%] max-w-[420px] max-h-[85dvh] min-w-[300px]:min-w-[320px] [@media(max-width:420px)]:rounded-sm bg-[#f5ead6] shadow-md flex flex-col pt-0 items-center justify-center z-10 ">
        <Map
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          initialViewState={{
            longitude: 3.257,
            latitude: 23.745,
            zoom: 0,
          }}
          attributionControl={false}
          projection="globe"
          mapStyle="mapbox://styles/mapbox/standard"
          style={{ width: "100%", height: "40vh" }}
          config={{
            basemap: {
              theme: "monochrome",
              lightPreset: "dusk",
              showPointOfInterestLabels: false,
              showTransitLabels: false,
              showRoadLabels: false,
            },
          }}
        >
          {pins.length > 0 &&
            getUniqueCountries(pins).map((pin) => (
              <MarkerPin key={pin.id} pin={pin} />
            ))}
        </Map>
        <CardContent className="flex flex-col gap-5 w-[90%]">
          <div id="user-personality" className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">@{username}</span>
            <CardTitle className="font-playfair text-3xl">
              {stats?.personality}
            </CardTitle>
            <p>
              Explored {stats?.countries} countries across {stats?.continents}{" "}
              continents.
            </p>
          </div>

          <div
            id="user-stats"
            className="max-w-[300px]:flex max-w-[300px]:flex-wrap grid grid-rows-[1fr_1fr] gap-1 [@media(min-width:300px)]:gap-2"
          >
            <div
              id="stats-r1"
              className=" grid grid-cols-2 [@media(min-width:300px)]:grid-cols-3  gap-2 items-center"
            >
              <div className="bg-black/5 rounded-md p-2.5 flex flex-col items-center gap-1">
                <span className="text-lg font-medium">{stats?.countries}</span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  countries
                </span>
              </div>
              <div className="bg-black/5 rounded-md p-2.5 flex flex-col items-center gap-1">
                <span className="text-lg font-medium">{stats?.continents}</span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  continents
                </span>
              </div>
              <div className="bg-black/5 rounded-md p-2.5 flex flex-col items-center gap-1">
                <span className="text-lg font-medium">
                  {stats?.percentOfWorld}%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  world
                </span>
              </div>
              <div className="[@media(min-width:300px)]:hidden bg-black/5 rounded-md p-2.5 flex flex-col items-center [@media(min-width:300px)]:gap-1">
                <span className="text-lg font-medium">{stats?.totalPins}</span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  pins
                </span>
              </div>
            </div>
            <div
              id="stats-r2"
              className=" grid grid-cols-1 [@media(min-width:300px)]:grid-cols-2 items-center h-fit gap-2"
            >
              <div className="[@media(max-width:300px)]:hidden bg-black/5 rounded-md p-2.5 flex flex-col items-center [@media(min-width:300px)]:gap-1">
                <span className="text-lg font-medium">{stats?.totalPins}</span>
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  pins
                </span>
              </div>
              <div className="bg-black/5 rounded-md p-2.5 flex items-center gap-3">
                <div className="text-2xl">
                  {getEmojiFlag(stats?.recentWishPlace.countryCode)}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    dreaming of
                  </span>
                  <span className="text-lg font-medium">
                    {countries[stats?.recentWishPlace.countryCode]?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button
            className="bg-transparent border border-muted-foreground rounded-md cursor-pointer hover:bg-[#e3d5bc]"
            variant="outline"
            onClick={copyShareLink}
          >
            <Share />
            Share your Atlas
          </Button>

          <footer className="mt-3 text-center">
            <div className="flex justify-center items-center">
              <Sparkles className="text-atlas-amber" size={12} />
              <span>AtlasMe Captured</span>
              <Dot size={12} />
              <Link
                to="/"
                className="text-atlas-indigo hover:border-b-atlas-indigo hover:border-b cursor-pointer"
              >
                map your travels
              </Link>
            </div>
            <span className="text-muted-foreground text-xs">
              © AtlasMe 2026
            </span>
          </footer>
        </CardContent>
      </Card>
    </div>
  );
}

export default Captured;
