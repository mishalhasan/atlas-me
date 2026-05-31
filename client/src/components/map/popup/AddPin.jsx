import { Heart, Check, X } from "lucide-react";
import { Spinner } from "../../ui/spinner";

export default function AddPin({
  handleAddPin,
  handleCancel,
  place,
  loading,
  error,
  searchResult,
}) {
  return (
    <div className="flex flex-col gap-2 min-w-20 min-h-29">
      {loading ? (
        <div className="flex flex-col gap-2 items-center justify-center mx-1 h-29 ">
          <Spinner />
          <span>Adding to your map...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-2 items-center justify-center mx-1 h-29">
          <span className="text-gray-500 text-sm">Something went wrong.</span>
          <button
            className="self-center w-fit hover:text-[#b8960c] text-[#c4a882] text-sm rounded-md px-4 py-2 font-sans cursor-pointer "
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="text-base text-[#1a1a1a] mb-1 font-playfair">
            Add {place}
          </span>

          <div className="flex gap-2">
            <button
              className="w-full bg-[#d4a843]/10 border-[#d4a843] border-[1.5px] hover:bg-[#d4a843]/20 text-[#92700a] font-medium rounded-md px-1 py-1 font-sans cursor-pointer"
              onClick={() => handleAddPin(searchResult, "wishlist")}
            >
              <Heart className="inline-flex items-center gap-2" size={15} />{" "}
              Wishlist
            </button>

            <button
              className="w-full bg-[rgba(124,58,237,0.1)] border-[#A78BFA] border-[1.5px] hover:bg-[#7C3AED]/20 text-[#A78BFA] font-medium rounded-md px-1 py-2 font-sans cursor-pointer"
              onClick={() => handleAddPin(searchResult, "visited")}
            >
              <Check className="inline-flex items-center gap-2" size={15} />{" "}
              Visited
            </button>
          </div>

          <button
            className="self-center w-fit hover:text-neutral-300 text-neutral-500 text-sm rounded-md px-4 py-2 font-sans cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
