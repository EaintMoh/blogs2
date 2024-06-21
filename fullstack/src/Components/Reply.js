import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Reply = ({ reply, users }) => {
  const replyUser = users.find(user => user.id === reply.user_id) || {};

  return (
    <div className="reply">
      <div className="user-info">
        <div className="left-side">
          <img
            src="https://www.comingsoon.net/wp-content/uploads/sites/3/2022/06/Baby-Groot.jpeg?w=800"
            alt="Baby Groot"
          />
          <p>{replyUser.username}</p>
          <p>{reply.createdAt}</p>
        </div>
        <div className="right-side">
          <div className="menu-icon">
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        </div>
      </div>
      <p>{reply.content}</p>
    </div>
  );
};

export default Reply;
