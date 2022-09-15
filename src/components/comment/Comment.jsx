import React from "react";
import { format } from "timeago.js";
import CommentForm from "../commentForm/CommentForm";
import "./Comment.css";

const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  addComment,
  setActiveComment,
  parentId = "",
  user,
  postId,
  updateComment,
}) => {
  // const fiveMinutes = 300000;
  // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment._id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment._id;
  const replyId = parentId ? parentId : comment._id;

  return (
    <div className="comment">
      <div className="comment-image-container">
        <img
          src={
            comment.profileImg
              ? process.env.REACT_APP_PUBLIC_FOLDER + comment.profileImg
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
          }
          style={{ width: "35px", height: "35px" }}
        />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div className="">{format(comment.createdAt)}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(commentData) =>
              updateComment(commentData, comment._id)
            }
            handleCancel={() => setActiveComment(null)}
            user={user}
            postId={postId}
            parentId={parentId}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment._id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            user={user}
            postId={postId}
            handleSubmit={(commentData) => addComment(commentData)}
            parentId={replyId}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply._id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                updateComment={updateComment}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={comment.id}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
