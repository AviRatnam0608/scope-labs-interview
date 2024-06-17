"use client";
import Navbar from "@/components/Navbar/Navbar";
import VideoPreview from "@/components/Video/Video";

import { FaExclamationTriangle } from "react-icons/fa";

import { useEffect, useState } from "react";
import { REQUEST_VIDEO_API } from "../../private/constants";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import DisplayName from "@/components/Displayname/Displayname";
import getUserID from "@/helper/GetUserId";
import Divider from "@/components/Divider/Divider";

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
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null);

  const [activeUser, setActiveUser] = useState<string>(user_name);
  const [activeUserVideos, setActiveUserVideos] = useState<VideoData[]>([]);

  const [searchUser, setSearchUser] = useState<string>("");

  const fetchAllVideos = async (username: string) => {
    const videoData = await fetch(`${REQUEST_VIDEO_API}${getUserID(username)}`);
    const jsonData = await videoData.json();
    username === activeUser
      ? setActiveUserVideos(jsonData["videos"])
      : setVideoData(jsonData["videos"]);
  };

  useEffect(() => {
    fetchAllVideos(activeUser);
  }, [activeUser]);

  return (
    <main className="flex flex-col min-h-screen p-12">
      <section>
        <Navbar />
      </section>

      <section className="flex items-center justify-between my-3">
        <DisplayName activeUser={activeUser} setActiveUser={setActiveUser} />
        <div className="w-1/2 flex items-center">
          <input
            type="text"
            className="w-full rounded-lg bg-slate-800 p-3 text-sm font-italics"
            placeholder="Search for videos by entering the creator's name..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button
            className="bg-slate-800 text-white rounded-lg p-2 ml-2"
            onClick={() => fetchAllVideos(searchUser)}
          >
            Search
          </button>
        </div>
      </section>

      <section>
        <button className="bg-yellow-600 p-2 rounded-lg cursor-pointer hover:bg-yellow-800">
          Create Video
        </button>
      </section>

      <section className="py-5 flex item-center justify-between gap-5">
        {/* Video player and video list */}
        <section className="w-3/4 bg-slate-800 rounded-lg">
          {activeVideo ? (
            <div className="flex flex-col">
              <VideoPlayer
                activeVideoData={activeVideo}
                activeUser={activeUser}
              />
            </div>
          ) : (
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
          )}
        </section>

        {/* Video list */}
        <section className="w-1/4">
          <h2 className="text-lg font-semibold">Video List</h2>
          <Divider />
          <div>
            <h2 className="text-md font-semibold">
              Search Results ({videoData?.length ? videoData?.length : 0})
            </h2>
          </div>
          <div className="my-2">
            {videoData?.length !== 0 && searchUser ? (
              <div>
                {videoData?.map((data) => {
                  return (
                    <VideoPreview
                      videoData={data}
                      key={data.id}
                      setActiveVideo={setActiveVideo}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 bg-slate-800 p-3 rounded-lg my-2 flex items-center gap-2">
                  <FaExclamationTriangle className="text-yellow-500" />
                  No videos found for user
                  <span className="text-slate-500 text-decoration-line: underline">
                    {searchUser}
                  </span>
                </p>
              </div>
            )}
          </div>
          <Divider />

          {/* Active user videos */}
          <div>
            <h2 className="text-md font-semibold">Your videos</h2>
          </div>
          <div className="my-2">
            {activeUserVideos?.length !== 0 ? (
              <div>
                {activeUserVideos?.map((data) => {
                  return (
                    <VideoPreview
                      videoData={data}
                      key={data.id}
                      setActiveVideo={setActiveVideo}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 bg-slate-800 p-3 rounded-lg my-2 flex items-center gap-2">
                  <FaExclamationTriangle className="text-yellow-500" />
                  No videos found
                </p>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
