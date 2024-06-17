import { VideoData } from "@/app/page";
import Divider from "../Divider/Divider";
import dateConvertor from "@/helper/DateConvertor";
import { useEffect, useState } from "react";
import { REQUEST_COMMENT_API } from "../../../private/constants";
import makeNameReadable from "@/helper/GetUsername";
import convertToEmbed from "@/helper/ConvertToEmbed";

interface CommentData {
  content: string;
  created_at: string;
  user_id: string;
  video_id: string;
  id: string;
}

const VideoPlayer = (props: VideoData) => {
  const [comments, setComments] = useState<CommentData[]>();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${REQUEST_COMMENT_API}${props.id}`);
      const data = await response.json();
      setComments(data["comments"]);
    };
    fetchComments();
  }, [props.id]);

  return (
    <div>
      <div className="w-full h-full flex flex-col">
        <iframe
          src={convertToEmbed(props.video_url)}
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
            <h2 className="text-2xl font-semibold my-1">{props.title}</h2>
            <p className="text-md flex gap-2 items-center text-slate-500">
              {props.user_id}
            </p>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Uploaded: {dateConvertor({ date: props.created_at })}
          </div>
        </div>

        <Divider />

        {/* Video description */}
        <div>
          <p className="font-semibold ">Description</p>
          <p className="text-sm mb-2">{props.description}</p>
        </div>

        <Divider />

        {/* Comments count */}
        <div className="mt-2">
          Comments: {props.num_comments}
          <div>
            {comments?.map((comment, index) => (
              <div
                key={index}
                className="bg-slate-900 p-4 rounded-lg my-2 w-1/2"
              >
                <span className="text-sm font-semibold">
                  {makeNameReadable(comment.user_id)}
                </span>
                <span className="text-sm text-gray-500">
                  {dateConvertor({ date: comment.created_at })}
                </span>
                <p className="text-sm mt-2">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
