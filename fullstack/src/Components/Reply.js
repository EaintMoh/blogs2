import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Reply.css";

const Reply = ({ replyData, users, onDelete }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(replyData.content);
  const [reply, setReply] = useState(replyData);
  const menuIconRef = useRef(null);
  const replyUser = users.find((user) => user.id === reply.user_id) || {};

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/replies/${reply.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(reply.id);
        console.log("Reply deleted successfully!");
      } else {
        console.error("Failed to delete reply:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setShowEditButton(false);
    setShowDeleteButton(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent(reply.content);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/replies/${reply.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (res.ok) {
        const updatedReply = await res.json();
        setReply(updatedReply);
        setEditMode(false);
        console.log("Reply edited successfully!");
      } else {
        console.error("Failed to edit reply:", res.statusText);
      }
    } catch (error) {
      console.error("Error editing reply:", error);
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

  return (
    <div className="reply">
      <div className="user-info">
        <div className="left-side">
          <img
            src="https://www.comingsoon.net/wp-content/uploads/sites/3/2022/06/Baby-Groot.jpeg?w=800"
            alt="Baby Groot"
          />
          <p>{replyUser.username}</p>
          <p>{new Date(reply.createdat).toLocaleDateString()}</p>
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
            className="replyTextarea"
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
        <p>{reply.content}</p>
      )}
    </div>
  );
};

export default Reply;
