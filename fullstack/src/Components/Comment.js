import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Reply from "./Reply";
import "../Styles/Comment.css";

const Comment = ({
  commentData,
  users,
  replies,
  saveReply,
  updateComment,
  deleteComment,
  deleteReply,
}) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(commentData.content);
  const [comment] = useState(commentData);
  const [deletedReplyId, setDeletedReplyId] = useState(null);
  const menuIconRef = useRef(null);

  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!selectedUser || !replyContent.trim()) {
      alert("ユーザーまたは返信内容が入力されていません。");
      return;
    }
    try {
      const newReply = await saveReply(comment.id, selectedUser, replyContent);

      replies.push(newReply);
      setReplyContent("");
      setSelectedUser("");
    } catch (error) {
      console.error("返信の保存に失敗しました:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${comment.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        deleteComment(comment.id); // Call the deleteComment function instead of updateComment
        console.log("Comment deleted successfully!");
      } else {
        console.error("Failed to delete comment:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setShowEditButton(false);
    setShowDeleteButton(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent(comment.content);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${comment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (res.ok) {
        console.log("Comment edited successfully!");
        const updatedComment = await res.json();
        updateComment(updatedComment); // Update the comment in the parent component
        comment.content = editedContent; // Update the local state
        setEditMode(false);
      } else {
        console.error("Failed to edit comment:", res.statusText);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuIcon = menuIconRef.current;
      const deleteButton = document.querySelector(".delete-button");
      const editButton = document.querySelector(".edit-button");

      if (menuIcon && menuIcon.contains(event.target)) {
        return;
      }

      if (deleteButton && !deleteButton.contains(event.target)) {
        setShowDeleteButton(false);
      }

      if (editButton && !editButton.contains(event.target)) {
        setShowEditButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const user = users.find((user) => user.id === comment.user_id) || {};

  return (
    <div className="comment">
      <div className="user-info">
        <div className="left-side">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2020/12/AP/QI/NQ/14784178/groot1.jpg"
            alt="Baby Groot"
          />
          <p>{user.username}</p>
          <p>{new Date(comment.createdat).toLocaleDateString()}</p>
        </div>
        <div className="right-side">
          <div
            className="menu-icon"
            onClick={() => {
              setShowDeleteButton(!showDeleteButton);
              setShowEditButton(!showEditButton);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          {showDeleteButton && (
            <button className="delete-button" onClick={handleDelete}>
              削除
            </button>
          )}
          {showEditButton && (
            <button className="edit-button" onClick={handleEdit}>
              編集
            </button>
          )}
        </div>
      </div>
      {editMode ? (
        <div>
          <textarea
            className="CommentTextarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
            cols={50}
          />
          <div className="edit-buttons">
            <button className="cancel-button" onClick={handleCancelEdit}>
              キャンセル
            </button>
            <button className="edit-submit-button" onClick={handleEditSubmit}>
              送信
            </button>
          </div>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
      <div className="replies">
        {replies
          .filter((reply) => reply && reply.comment_id === comment.id)
          .map(
            (reply) =>
              reply &&
              reply.id !== deletedReplyId && (
                <Reply
                  key={reply.id}
                  replyData={reply}
                  users={users}
                  onDelete={setDeletedReplyId}
                />
              )
          )}
      </div>
      <div className="ReplyBox">
        <form className="ReplyForm" onSubmit={handleReply}>
          <select value={selectedUser} onChange={handleUserChange} required>
            <option value="">ユーザーを選択</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <textarea
            name="replyContent"
            value={replyContent}
            onChange={handleReplyChange}
            cols="50"
            rows="3"
            required
          ></textarea>
          <button type="submit">返信</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
