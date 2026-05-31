import Pin from "./pins/Pin";

function Legend() {
  return (
    <div className="flex gap-5 w-full justify-center text-white max-[300px]:flex-wrap">
      <div className="flex gap-2 items-center">
        <Pin size={12} type="wishlist" />
        <span className="text-xs text-grey">Wishlist</span>
      </div>

      <div className="flex gap-2 items-center">
        <Pin className=" text-grey" size={12} type="visited" />
        <span className="text-xs text-grey">Visited</span>
      </div>
    </div>
  );
}

export default Legend;
