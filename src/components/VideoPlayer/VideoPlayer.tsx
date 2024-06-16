import { VideoData } from "@/app/page";
import Divider from "../Divider/Divider";
import { FaRegUser } from "react-icons/fa";
import dateConvertor from "@/helper/DateConvertor";
import { useEffect, useState } from "react";
import { REQUEST_COMMENT_API } from "../../../private/constants";
import YouTube from "react-youtube";

interface CommentData {
  content: string;
  created_at: string;
  user_id: string;
  video_id: string;
  id: string;
}

const VideoPlayer = (props: VideoData) => {
  console.log(props);
  const [comments, setComments] = useState<CommentData[]>();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${REQUEST_COMMENT_API}${props.id}`);
      const data = await response.json();
      setComments(data["comments"]);
    };
    fetchComments();
  }, [props.id]);

  console.log(comments);

  return (
    <div>
      <div className="flex flex-col">
        <video controls className="w-full rounded-t-lg">
          <source src={props.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <iframe
          src="https://www.youtube.com/embed/E7wJTI-1dvQ"
          allow="autoplay; encrypted-media"
          allowfullscreen={true}
          title="video"
          className="w-full rounded-t-lg"
        /> */}
        {/* <div className="w-full">
          <YouTube videoId="E7wJTI-1dvQ" className="w-full rounded-t-lg" />
        </div> */}
      </div>
      <div className="flex flex-col justify-start p-5">
        {/* Video title, author and date/ time published */}
        <div>
          <h2 className="text-2xl font-semibold my-1">{props.title}</h2>
          <p className="text-sm flex gap-2 items-center">
            <FaRegUser /> {props.user_id}
          </p>
          <div className="text-sm text-gray-500 mt-2">
            {dateConvertor({ date: props.created_at })}
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
                <span className="text-sm font-semibold">{comment.user_id}</span>
                <span className="text-sm text-gray-500">
                  {" "}
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
