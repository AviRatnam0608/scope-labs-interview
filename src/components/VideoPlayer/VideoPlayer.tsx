import { VideoData } from "@/app/page";
import Divider from "../Divider/Divider";
import dateConvertor from "@/helper/DateConvertor";
import { useEffect, useState } from "react";
import {
  REQUEST_COMMENT_API,
  REQUEST_COMMENT_POST_API,
} from "../../../private/constants";
import makeNameReadable from "@/helper/GetUsername";
import convertToEmbed from "@/helper/ConvertToEmbed";

interface CommentData {
  content: string;
  created_at: string;
  user_id: string;
  video_id: string;
  id: string;
}

interface VideoPlayerData {
  activeVideoData: VideoData;
  activeUser: string;
}

const VideoPlayer = ({ activeVideoData, activeUser }: VideoPlayerData) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `${REQUEST_COMMENT_API}${activeVideoData.id}`
      );
      const data = await response.json();
      setComments(data["comments"]);
    };
    fetchComments();
  }, [activeVideoData.id]);

  const postComment = async (comment: string) => {
    const response = await fetch(REQUEST_COMMENT_POST_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
        user_id: activeUser,
        video_id: activeVideoData.id,
      }),
    });
    const data = await response.json();
    setComments([...comments, data]);
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col">
        <iframe
          src={convertToEmbed(activeVideoData.video_url)}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          className="w-full h-96 rounded-t-lg"
        />
      </div>
      <div className="flex flex-col justify-start p-5">
        {/* Video title, author and date/ time published */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold my-1">
              {activeVideoData.title}
            </h2>
            <p className="text-md flex gap-2 items-center text-slate-500">
              {activeVideoData.user_id}
            </p>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Uploaded: {dateConvertor({ date: activeVideoData.created_at })}
          </div>
        </div>

        <Divider />

        {/* Video description */}
        <div>
          <p className="font-semibold ">Description</p>
          <p className="text-sm mb-2">{activeVideoData.description}</p>
        </div>

        <Divider />

        {/* Comments count */}
        <div className="mt-2">
          Comments: {activeVideoData.num_comments}
          <div className="flex gap-2 my-2">
            <input
              type="text"
              placeholder="Comment..."
              className="w-1/2 rounded-lg bg-slate-600 p-3 text-sm font-italics"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="bg-yellow-600 p-2 rounded-lg cursor-pointer"
              onClick={() => postComment(newComment)}
            >
              Comment
            </button>
          </div>
          <div>
            {comments?.length !== 0 ? (
              comments?.map((comment, index) => (
                <div
                  key={index}
                  className="bg-slate-900 p-4 rounded-lg my-2 w-1/2"
                >
                  <span className="text-sm font-semibold">
                    {makeNameReadable(comment.user_id)}{" "}
                  </span>
                  <span className="text-sm text-gray-500">
                    {dateConvertor({ date: comment.created_at })}
                  </span>
                  <p className="text-sm mt-2">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 bg-slate-800 rounded-lg my-2 flex items-center gap-2">
                No comments found. Comment to start the conversation!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
