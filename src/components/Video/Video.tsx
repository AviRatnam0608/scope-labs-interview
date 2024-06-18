import { VideoData } from "@/app/page";
import { dateConvertor, makeNameReadable } from "@/helper/helperFunctions";

interface VideoPreviewProps {
  videoData: VideoData;
  setActiveVideo: (video: VideoData) => void;
  activeVideo?: VideoData;
}

const VideoPreview = ({
  videoData,
  setActiveVideo,
  activeVideo,
}: VideoPreviewProps) => {
  return (
    <div
      key={videoData.id}
      className={`bg-slate-200 border  rounded-lg p-4 mb-4 
      hover:shadow-lg
      hover:border-slate-700
      cursor-pointer 
      transition 
      duration-300 
      ease-in-out ${
        activeVideo?.id === videoData.id
          ? "border-2 border-primaryYellow"
          : "border-slate-300"
      }`}
      onClick={() => setActiveVideo(videoData)}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-slate-800 font-semibold">
          {videoData.title}
        </h2>
        <p className="text-sm text-slate-800">
          {makeNameReadable(videoData.user_id)}
        </p>
      </div>
      <p className="mb-2 text-sm text-slate-800">{videoData.description}</p>
      <div className="text-sm text-gray-500 mt-2">
        Uploaded: {dateConvertor({ date: videoData.created_at })}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Comments: {videoData.num_comments}
      </div>
    </div>
  );
};

export default VideoPreview;
