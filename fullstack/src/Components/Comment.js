import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Reply from "./Reply";

const Comment = ({ comment, users, replies, saveReply }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [replyContent, setReplyContent] = useState("");

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
          <p>{comment.createdat}</p>
        </div>
        <div className="right-side">
          <div className="menu-icon">
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        </div>
      </div>
      <p>{comment.content}</p>
      <div className="replies">
        {replies
          .filter((reply) => reply.comment_id === comment.id)
          .map((reply) => (
            <Reply key={reply.id} reply={reply} users={users} />
          ))}
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
