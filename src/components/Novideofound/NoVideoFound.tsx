import { FaExclamationTriangle } from "react-icons/fa";

export const NoVideoFoundSide = ({ name }: { name: string }) => {
  return (
    <div>
      <p className="text-sm text-gray-500 bg-slate-200 border border-slate-300 p-3 rounded-lg my-2 flex items-center gap-2">
        <FaExclamationTriangle className="text-yellow-500" />
        No videos found for user
        <span className="text-slate-500 text-decoration-line: underline">
          {name}
        </span>
      </p>
    </div>
  );
};

export const NoVideoFoundMain = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <FaExclamationTriangle className="text-yellow-500" />
        No video available
      </h2>
      <p className="text-sm text-gray-500">
        Please select a video from the list on the right
      </p>
      <p className="text-sm text-gray-500">
        Or search for one with the search bar above
      </p>
    </div>
  );
};
