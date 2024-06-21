// Comment.js
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Reply from './Reply';

const Comment = ({ comment, users, replies }) => {
  const user = users.find(user => user.id === comment.user_id) || {};

  return (
    <div className="comment">
      <div className="user-info">
        <div className="left-side">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2020/12/AP/QI/NQ/14784178/groot1.jpg"
            alt="Baby Groot"
          />
          <p>{user.username}</p>
          <p>{comment.createdAt}</p>
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
          .filter(reply => reply.comment_id === comment.id)
          .map(reply => (
            <Reply key={reply.id} reply={reply} users={users} />
          ))}
      </div>
    </div>
  );
};

export default Comment;
