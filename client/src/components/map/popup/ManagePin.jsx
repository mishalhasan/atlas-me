import { Trash2, Save, SaveIcon, CircleCheck } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function ManagePin({
  handleUpdate,
  handleDelete,
  handleCancel,
  matchedPin,
  place,
  loading,
  error,
}) {
  const [draftTypes, setDraftTypes] = useState(() =>
    matchedPin?.types ? [...matchedPin.types] : [],
  );

  const handleCheck = (type) => {
    setDraftTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((draftType) => draftType !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 min-w-20 min-h-29">
      {loading ? (
        <div className="flex flex-col gap-2 items-center justify-center mx-1 h-29 ">
          <Spinner />
          <span>Updating your map...</span>
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
          <div className="flex flex-col gap-2 h-full">
            <div className="flex items-center justify-between mb-2 ">
              <span className="text-base text-[#1a1a1a] border-b border-atlas-amber pb-1 font-playfair break-words">
                {place}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draftTypes.includes("wishlist")}
                  onChange={() => handleCheck("wishlist")}
                />
                Wishlist
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draftTypes.includes("visited")}
                  onChange={() => handleCheck("visited")}
                />
                Visited
              </label>
            </div>

            <div className="flex justify-end items-center gap-2 mt-3 pt-2 ">
              <button
                className="flex items-center border border-rose-400 mt-1 rounded justify-center text-rose-400 hover:bg-red-500/20 hover:text-rose-600 cursor-pointer transition-colors p-1.5"
                onClick={() => handleDelete(matchedPin.id)}
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </button>
              <button
                className="flex items-center border border-atlas-indigo rounded mt-1 justify-center text-[#4F46E5] hover:bg-indigo-400/20 hover:text-[#3730a3] cursor-pointer transition-opacity p-1.5"
                onClick={() => handleUpdate(matchedPin.id, draftTypes)}
              >
                <Save size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
