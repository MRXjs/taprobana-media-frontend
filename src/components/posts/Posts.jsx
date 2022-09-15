import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import "./Posts.css";
import { getTimelinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts) return "no posts";
  if (params.id) posts = posts.filter((posts) => posts.userId === params.id);

  return (
    <div className="Posts">
      {loading ? (
        <ReactLoading type={"spin"} color={"#f5aa0a"} height={50} width={50} />
      ) : (
        posts.map((post, id) => {
          return <Post data={post} id={id} />;
        })
      )}
    </div>
  );
};

export default Posts;
