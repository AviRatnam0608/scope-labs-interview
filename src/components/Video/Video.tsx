import { VideoData } from "@/app/page";

const VideoPreview = (props: VideoData) => {
  return (
    <div
      key={props.id}
      className="bg-slate-800 border border-slate-900 shadow-md rounded-lg p-4 mb-4"
    >
      <div>
        <h2 className="text-lg font-semibold">{props.title}</h2>
        <p className="text-sm text-gray-600">{props.user_id}</p>
      </div>
      <p className="mb-2 text-gray-700">{props.description}</p>
      <a
        href={props.video_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Watch Video
      </a>
      <div className="text-sm text-gray-500 mt-2">
        {new Date(props.created_at).toLocaleString()}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Comments: {props.num_comments}
      </div>
    </div>
  );
};

export default VideoPreview;
