"use client";
import Navbar from "@/components/Navbar/Navbar";
import VideoPreview from "@/components/Video/Video";

import { useEffect, useState } from "react";
import { REQUEST_VIDEO_API } from "../../private/constants";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import DisplayName from "@/components/Displayname/Displayname";
import { getUserID, makeNameReadable } from "@/helper/helperFunctions";
import Divider from "@/components/Divider/Divider";
import {
  NoVideoFoundMain,
  NoVideoFoundSide,
} from "@/components/Novideofound/NoVideoFound";
import UploadVideo from "@/components/UploadVideo/UploadVideo";

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
  const [activeVideo, setActiveVideo] = useState<VideoData | undefined>(
    undefined
  );

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
  }, [activeUser, activeUserVideos]);

  return (
    <main className="flex flex-col min-h-screen p-12 bg-white">
      {/* Navigation bar */}
      <section>
        <Navbar />
      </section>

      {/* Display name and search bar */}
      <section className="flex items-center justify-between my-3">
        <DisplayName activeUser={activeUser} setActiveUser={setActiveUser} />
        <div className="w-1/2 flex items-center">
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 text-slate-800 bg-slate-200 p-3 text-sm font-italics"
            placeholder="Search for videos by entering the creator's name..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button
            className="bg-primaryGreen hover:bg-secondaryGreen text-white rounded-lg p-2 ml-2"
            onClick={() => fetchAllVideos(searchUser)}
          >
            Search
          </button>
        </div>
      </section>

      {/* Video player and video list */}
      <section className="py-5 flex item-center justify-between gap-5">
        {/* Video player */}
        <section className="w-3/4">
          {activeVideo ? (
            <div className="flex flex-col">
              <VideoPlayer
                activeVideoData={activeVideo}
                activeUser={activeUser}
              />
            </div>
          ) : (
            <NoVideoFoundMain />
          )}
        </section>

        {/* Video list */}
        <section className="w-1/4">
          <h2 className="text-lg text-slate-800 font-semibold">Video List</h2>
          <Divider />
          <div>
            <h2 className="text-md text-slate-800 font-semibold">
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
                      activeVideo={activeVideo}
                    />
                  );
                })}
              </div>
            ) : (
              <NoVideoFoundSide name={searchUser} />
            )}
          </div>
          <Divider />

          {/* Active user videos */}
          <div>
            <h2 className="text-md font-semibold text-slate-800">
              Your videos ({activeUserVideos?.length})
            </h2>
          </div>
          <div className="my-2">
            {activeUser !== "" && activeUserVideos?.length !== 0 ? (
              <div>
                {activeUserVideos?.map((data) => {
                  return (
                    <VideoPreview
                      videoData={data}
                      key={data.id}
                      setActiveVideo={setActiveVideo}
                      activeVideo={activeVideo}
                    />
                  );
                })}
              </div>
            ) : (
              <NoVideoFoundSide name={makeNameReadable(activeUser)} />
            )}
          </div>

          <Divider />

          {/* Upload video */}
          <section>
            <h2 className="text-md font-semibold text-slate-800">
              Upload video
            </h2>
            <UploadVideo
              activeUser={activeUser}
              activeUserVideos={activeUserVideos}
              setActiveUserVideos={setActiveUserVideos}
            />
          </section>
        </section>
      </section>
    </main>
  );
}
