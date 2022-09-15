import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createComment,
  getComments,
  deleteCommentApi,
  updateCommentApi,
} from "../../api/CommentRequest";
import Comment from "../comment/Comment";
import CommentForm from "../commentForm/CommentForm";
import "./Comments.css";

const Comments = ({ postId }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const currentUserId = user._id;
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) =>
      backendComment.parentId === "" && backendComment.postId === postId
  );

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = async (commentData) => {
    try {
      const data = (await createComment(commentData)).data;
      setBackendComments([data, ...backendComments]);
      setActiveComment(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure that you want to remove comment")) {
      try {
        await deleteCommentApi(commentId);
        const updateBackendComment = backendComments.filter(
          (backendComment) => backendComment._id !== commentId
        );
        setBackendComments(updateBackendComment);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateComment = async (commentData, commentId) => {
    try {
      await updateCommentApi(commentId, commentData);
      const updateBackendComments = backendComments.map((backendComment) => {
        if (backendComment._id === commentId) {
          return { ...backendComment, body: commentData.body };
        }
        return backendComment;
      });
      setBackendComments(updateBackendComments);
      setActiveComment(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      const data = (await getComments()).data;
      setBackendComments(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="comments">
      <div className="comment-form-title">Write comment</div>
      <CommentForm
        submitLabel="Write"
        handleSubmit={addComment}
        postId={postId}
        user={user}
        parentId=""
      />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            currentUserId={currentUserId}
            deleteComment={deleteComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            user={user}
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
