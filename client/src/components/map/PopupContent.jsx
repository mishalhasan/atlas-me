import { Heart, Check, X } from "lucide-react";

export default function PopupContent({

  handleAddPin,
  handleCancel,
  place,
}) {
  return (
    <div className="flex flex-col gap-2 min-w-20">
      <span className="text-base text-[#1a1a1a] mb-1 font-playfair">
        Add {place}
      </span>

      <div className="flex gap-2">
        <button
          //className=" w-full bg-white border-[#d4a843] border-[1.5px] hover:border-[rgba(212,168,67,0.1)] hover:bg-[rgba(212,168,67,0.1)] text-[#92700a] font-medium rounded-md px-1 py-1 font-sans cursor-pointer"
          onClick={() => handleAddPin("wishlist")}
          className=" w-full bg-[rgba(212,168,67,0.1)] border-[#d4a843] border-[1.5px] hover:border-[rgba(212,168,67,0.1)] hover:bg-[#d4a843]/30 text-[#92700a] font-medium rounded-md px-1 py-1 font-sans cursor-pointer"
        >
          <Heart className=" inline-flex items-center gap-2" size={15} />
          {"  "}
          Wishlist
        </button>
        <button
          onClick={() => handleAddPin("visited")}
          className=" w-full bg-[#d4a843] hover:bg-[#c49b38]  text-[#5c3d00] font-medium rounded-md px-1 py-2 font-sans cursor-pointer"
        >
          <Check
            className="bg-white/0.9 inline-flex items-center gap-2"
            size={15}
          />{" "}
          Visited
        </button>
      </div>
      <button
        onClick={handleCancel}
        className=" self-center w-fit hover:text-[#b8960c] text-[#c4a882] text-sm rounded-md px-4 py-2 font-sans cursor-pointer "
      >
        Cancel
      </button>
    </div>
  );
}
