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
  console.log(matchedPin);
  const [draftTypes, setDraftTypes] = useState(() =>
    matchedPin?.types ? [...matchedPin.types] : [],
  );
  console.log("dft", draftTypes);

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
          {/* <div className="flex flex-col gap-2 h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base text-[#1a1a1a] font-playfair break-words">
                {place}
              </span>
              <button
                className="flex items-center justify-center text-[#4F46E5] hover:opacity-70 cursor-pointer select-none transition-opacity"
                onClick={() => handleUpdate(draftTypes)}
              >
                <CircleCheck size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label>
                <input
                  type="checkbox"
                  checked={draftTypes.includes("wishlist")}
                  onChange={() => handleCheck("wishlist")}
                />
                {"  "}Wishlist
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={draftTypes.includes("visited")}
                  onChange={() => handleCheck("visited")}
                />{" "}
                Visited
              </label>
            </div>

            <div className="flex justify-center pt-2 border-t border-neutral-100">
              <button
                className="flex items-center gap-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-400 text-sm rounded-md px-4 py-1.5 font-sans cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 size={13} strokeWidth={2} />
                Delete
              </button>
            </div>
          </div>
          <> */}
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

          {/* <div className="flex flex-col gap-2 h-full">
            <div className="grid grid-cols-[2fr_auto] items-start gap-6 w-full mb-2">
              <span className="text-base text-[#1a1a1a] font-playfair break-words">
                {place}
              </span>

              <button
                className="flex items-center justify-center my-1 text-rose-600 hover:text-rose-800 cursor-pointer select-none transition-colors"
                onClick={handleDelete}
              >
                <Trash2 size={20} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label>
                <input
                  type="checkbox"
                  checked={draftTypes.includes("wishlist")}
                  onChange={() => handleCheck("wishlist")}
                />
                {"  "}
                Wishlist
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={draftTypes.includes("visited")}
                  onChange={() => handleCheck("visited")}
                />{" "}
                Visited
              </label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                className="self-center w-fit hover:text-neutral-300 text-neutral-500 text-sm rounded-md px-4 py-2 font-sans cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className=" bg-atlas-indigo hover:bg-[#3730a3] text-white font-medium rounded-md px-4 py-2 font-sans cursor-pointer"
                onClick={() => handleUpdate(draftTypes)}
              >
                Save
              </button>
            </div> 
          </div>*/}

          {/* <div className="flex flex-col gap-2 h-full">
            <span className="text-base text-[#1a1a1a] font-playfair break-words pb-2">
              {place}
            </span>

            <div className="flex flex-col gap-1.5">
              <label>
                <input
                  type="checkbox"
                  checked={draftTypes.includes("wishlist")}
                  onChange={() => handleCheck("wishlist")}
                />
                {"  "}Wishlist
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={draftTypes.includes("visited")}
                  onChange={() => handleCheck("visited")}
                />{" "}
                Visited
              </label>
            </div>

            <div className="flex items-center justify-between gap-1.5 pt-2"> */}
          {/* <button
                className="border border-rose-600 flex gap-1 text-sm hover:bg-neutral-50 text-neutral-400 hover:text-neutral-600 rounded-md p-2 cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 size={16} strokeWidth={2} />{" "}
                <span className="text-neutral-400">Delete</span>
              </button>
              <button
                className="bg-transparent border-[1.5px] flex gap-1 border-[#4F46E5] hover:bg-[#4F46E5]/10 text-[#4F46E5] font-medium rounded-md px-4 py-2 font-sans cursor-pointer"
                onClick={() => handleUpdate(draftTypes)}
              >
                <Save size={16} strokeWidth={2} /> <span>Save</span>
              </button> */}
          {/* <button
                className="border border-grey-400 flex gap-1 text-sm hover:bg-neutral-50 text-rose-400 hover:text-neutral-600 rounded-md px-4 py-2 cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 size={16} strokeWidth={2} />{" "}
                Delete
              </button>
              <button
                className="bg-transparent border-[1.5px] flex gap-1 border-[#4F46E5] hover:bg-[#4F46E5]/10 text-[#4F46E5] font-medium rounded-md px-4 py-2 font-sans cursor-pointer"
                onClick={() => handleUpdate(draftTypes)}
              >
                <Save size={16} strokeWidth={2} />
                Save
              </button>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}
