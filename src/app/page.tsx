"use client";
import Navbar from "@/components/Navbar/Navbar";
import VideoPreview from "@/components/Video/Video";

import { useEffect, useState } from "react";
import { REQUEST_VIDEO_API } from "../../private/constants";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";

export interface VideoData {
  created_at: string;
  video_url: string;
  user_id: string;
  description: string;
  title: string;
  num_comments: number;
  id: string;
}

export default function Home() {
  const user_name = "john_doe";
  const testingVideo = {
    created_at: "2024-05-20T22:02:10.274188+00:00",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    user_id: "john_doe",
    description: "One more test",
    title: "Test02",
    num_comments: 1,
    id: "UneeWGoxerzXGqwJphey",
  };

  const [videoData, setVideoData] = useState<VideoData[]>();
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const [activeVideo, setActiveVideo] = useState<VideoData>(testingVideo);

  useEffect(() => {
    const fetchAllVideos = async () => {
      const videoData = await fetch(`${REQUEST_VIDEO_API}${user_name}`);
      const jsonData = await videoData.json();
      setVideoData(jsonData["videos"]);
    };
    fetchAllVideos();
  }, []);

  console.log(videoData);

  return (
    <main className="flex flex-col min-h-screen p-12">
      <section>
        <Navbar />
      </section>

      <section className="flex items-center justify-center">
        <input
          type="text"
          className="w-1/2 rounded-lg h-8 bg-slate-800 p-2 text-sm"
        />
      </section>

      <section className="py-5 flex item-center justify-between gap-5">
        <div className="w-3/4 bg-slate-800 rounded-lg">
          <div className="flex flex-col">
            <VideoPlayer {...activeVideo} />
          </div>
        </div>
        <div className="w-1/4">
          {videoData && (
            <div>
              {videoData.map((data) => {
                return <VideoPreview {...data} key={data.id} />;
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
