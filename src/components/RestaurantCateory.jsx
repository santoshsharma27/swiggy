import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import ItemList from "./ItemList";

function RestaurantCategory({ data, num, curOpen, onOpen }) {
  const isOpen = num === curOpen;

  function handleClick() {
    onOpen(isOpen ? null : num);
  }

  return (
    <div className="mx-auto my-4 w-full rounded-lg bg-white shadow-lg md:w-8/12">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition duration-300 hover:bg-gray-100"
        onClick={handleClick}
      >
        <span className="text-lg font-semibold">
          {data.title} ({data?.itemCards.length})
        </span>
        <span className="text-gray-600">
          {isOpen ? (
            <HiChevronUp className="text-lg" />
          ) : (
            <HiChevronDown className="text-lg" />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="mt-2 overflow-hidden transition-all duration-300 ease-in-out">
          <ItemList items={data.itemCards} />
        </div>
      )}
    </div>
  );
}

export default RestaurantCategory;
