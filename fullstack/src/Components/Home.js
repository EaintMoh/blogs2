// Home.js
import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Comment from "./Comment";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");

  const fetchData = async () => {
    try {
      const usersRes = await fetch("http://localhost:5000/api/users");
      const usersData = await usersRes.json();
      setUsers(usersData);

      const commentsRes = await fetch("http://localhost:5000/api/comments");
      const commentsData = await commentsRes.json();
      setComments(commentsData);

      const repliesRes = await fetch("http://localhost:5000/api/replies");
      const repliesData = await repliesRes.json();
      setReplies(repliesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            users={users}
            replies={replies}
          />
        ))}
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
