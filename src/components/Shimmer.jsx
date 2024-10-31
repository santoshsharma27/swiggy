const Shimmer = () => {
  return (
    <div className="flex flex-wrap items-center justify-center pt-4">
      {Array(20)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="m-4 flex w-full max-w-[290px] animate-pulse flex-col rounded-lg sm:max-w-[300px] lg:max-w-[320px]"
          >
            {/* Image Placeholder */}
            <div className="m-5 h-[180px] rounded-lg bg-gray-300 sm:h-[180px] md:h-[200px]"></div>

            {/* Text Placeholders */}
            <div className="flex h-full flex-col p-4">
              {/* Title Placeholder */}
              <div className="mb-2 h-6 rounded-md bg-gray-300"></div>

              {/* Rating Placeholder */}
              <div className="mt-auto flex items-center justify-start text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300"></span>
                <div className="mx-2 h-5 w-12 rounded-md bg-gray-300"></div>
                <h4 className="px-1 font-bold text-gray-300">•</h4>
                <div className="h-5 w-24 rounded-md bg-gray-300"></div>
              </div>

              {/* Cuisines and Locality Placeholders */}
              <div className="mb-2 mt-3 h-4 rounded-md bg-gray-300"></div>
              <div className="mt-1 h-4 rounded-md bg-gray-300"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
