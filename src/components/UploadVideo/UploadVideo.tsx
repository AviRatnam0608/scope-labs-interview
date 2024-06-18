import { useReducer, useState } from "react";
import { FaLock } from "react-icons/fa";
import { REQUEST_VIDEO_POST_API } from "../../../private/constants";
import { VideoData } from "@/app/page";

interface VideoUploadData {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
}

interface UploadVideoProps {
  activeUser: string;
  activeUserVideos: VideoData[];
  setActiveUserVideos: (arg0: VideoData[]) => void;
}

const youtubeUrlPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

const UploadVideo = ({
  activeUser,
  activeUserVideos,
  setActiveUserVideos,
}: UploadVideoProps) => {
  const reducer = (state: VideoUploadData | any, action: any) => {
    return { ...state, ...action };
  };

  const initialVideoData: VideoUploadData = {
    user_id: activeUser,
    description: "",
    video_url: "",
    title: "",
  };

  const [videoData, setVideoData] = useReducer(reducer, initialVideoData);

  const handleSubmit = async () => {
    const response = await fetch(REQUEST_VIDEO_POST_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...videoData,
        user_id: activeUser,
      }),
    });
    const data = await response.json();
    setVideoData(initialVideoData);
    setActiveUserVideos([...activeUserVideos, data]);
  };

  return (
    <div className="w-full bg-slate-800 rounded-lg p-4 my-2">
      <label className="text-slate-200 text-sm font-semibold">User*</label>
      <div className="relative w-full">
        <input
          type="string"
          value={activeUser}
          className="w-full rounded-lg border border-slate-800 text-slate-800 bg-slate-400 p-2 text-sm pr-10"
          readOnly
        />
        <FaLock className="text-slate-200 absolute right-2 top-1/2 transform -translate-y-1/2" />
      </div>

      <label className="text-slate-200 text-sm font-semibold">Title*</label>
      <input
        type="string"
        className="w-full rounded-lg border border-slate-300 text-slate-800 bg-slate-200 p-2 text-sm"
        required
        onChange={(e) => setVideoData({ title: e.target.value })}
      />

      <label className="text-slate-200 text-sm font-semibold">
        Description*
      </label>
      <textarea
        className="w-full max-h-20 rounded-lg border border-slate-300 text-slate-800 bg-slate-200 p-2 text-sm"
        required
        onChange={(e) => setVideoData({ description: e.target.value })}
      ></textarea>

      <label className="text-slate-200 text-sm font-semibold">Video URL*</label>
      <input
        type="string"
        className="w-full rounded-lg border border-slate-300 text-slate-800 bg-slate-200 p-2 text-sm"
        required
        onChange={(e) => setVideoData({ video_url: e.target.value })}
      />

      <button
        className="w-full disabled:bg-slate-700 bg-primaryGreen hover:bg-secondaryGreen text-white rounded-lg p-2 mt-2"
        onClick={() => handleSubmit()}
        disabled={
          !videoData?.title ||
          !videoData?.description ||
          !videoData?.video_url?.match(youtubeUrlPattern)
        }
      >
        Upload
      </button>
      <p className="text-slate-200 text-xs mt-2">
        Fields marked with * are required
      </p>
    </div>
  );
};

export default UploadVideo;
