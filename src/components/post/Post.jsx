import React, { useEffect, useState } from "react";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import "./Post.css";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import Swal from "sweetalert2";
import { getUser } from "../../api/UserRequst";
import Comments from "../comments/Comments";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [profileImg, setProfileImg] = useState("");

  // Comment section state & variable

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  //swAlert
  const postAlert = () => {
    Swal.fire({
      title: "info",
      text: "Maintenance is in progress",
      icon: "info",
      confirmButtonText: "Cool",
    });
  };

  useEffect(() => {
    const getProfileimg = async () => {
      try {
        const newUser = await getUser(data.userId);
        setProfileImg(newUser.data.profilePicture);
      } catch (error) {}
    };
    getProfileimg();
  }, [data]);

  // Comments section fucntion

  return (
    <div className="Post">
      <div className="detail">
        <span>
          <img
            src={
              profileImg
                ? process.env.REACT_APP_PUBLIC_FOLDER + profileImg
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </span>
        <span>
          <b>{data.username + "  "}</b>
        </span>
        <span>{data.desc}</span>
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" onClick={postAlert} />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      {/* Comments sections*/}
      <Comments postId={data._id} />
    </div>
  );
};

export default Post;
