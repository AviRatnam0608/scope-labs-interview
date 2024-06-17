import { VideoData } from "@/app/page";
import dateConvertor from "@/helper/DateConvertor";

interface VideoPreviewProps {
  videoData: VideoData;
  setActiveVideo: (video: VideoData) => void;
}

const VideoPreview = ({ videoData, setActiveVideo }: VideoPreviewProps) => {
  return (
    <div
      key={videoData.id}
      className="bg-slate-800 border border-2 border-slate-900 shadow-md rounded-lg p-4 mb-4 
      hover:shadow-lg
      hover:border-slate-700
      hover: border-4
      cursor-pointer 
      transition 
      duration-300 
      ease-in-out"
      onClick={() => setActiveVideo(videoData)}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{videoData.title}</h2>
        <p className="text-sm text-slate-500">{videoData.user_id}</p>
      </div>
      <p className="mb-2 text-sm">{videoData.description}</p>
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
