import React, { useState } from "react";
import sampleData from "../sample.json";
import "../Styles/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [data] = useState(sampleData.comments);
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const sendComment = () => {};

  return (
    <div className="home-container">
      <div className="Search">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="コメントを検索"
          />
          <button type="submit">検索</button>
        </form>
      </div>
      <div className="comments">
        {data.map((comment) => {
          return (
            <div key={comment.id} className="comment">
              <div className="user-info">
                <div className="left-side">
                  <img
                    src={comment.user.image.png}
                    alt={comment.user.username}
                  />
                  {/* <img
                        src="https://www.comingsoon.net/wp-content/uploads/sites/3/2022/06/Baby-Groot.jpeg?w=800"
                        alt="Baby Groot"
                      /> */}
                  <p>{comment.user.username}</p>
                  <p>{comment.createdAt}</p>
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
                </div>
              </div>
              <p>{comment.content}</p>
              <div className="replies">
                {comment.replies.map((reply) => {
                  return (
                    <div key={reply.id} className="reply">
                      <div className="user-info">
                        <div className="left-side">
                          <img
                            src={reply.user.image.png}
                            alt={reply.user.username}
                          />
                          <p>{reply.user.username}</p>
                          <p>{reply.createdAt}</p>
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
                        </div>
                      </div>
                      <p>{reply.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="post">
        <form
          className="postForm"
          onSubmit={(e) => {
            e.preventDefault();
            sendComment();
          }}
        >
          <textarea
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            cols="50"
            rows="3"
            required
          ></textarea>
          <button type="submit">投稿</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
