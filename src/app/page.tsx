"use client";
import Navbar from "@/components/Navbar/Navbar";
import VideoPreview from "@/components/Video/Video";

import { useEffect, useState } from "react";
import { REQUEST_VIDEO_API } from "../../private/constants";

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

  const [videoData, setVideoData] = useState<VideoData[]>();
  const [isLoading, setIsLoading] = useState(false);

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

      <section className="py-5">
        {videoData && (
          <div>
            {videoData.map((data) => {
              return <VideoPreview {...data} key={data.id} />;
            })}
          </div>
        )}
      </section>
    </main>
  );
}
