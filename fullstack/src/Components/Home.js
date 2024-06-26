import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import Comment from "./Comment";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

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
    if (search.trim() === "") {
      fetchData();
    } else {
      const filteredComments = comments.filter((comment) =>
        comment.content.toLowerCase().includes(search.toLowerCase())
      );
      setComments(filteredComments);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !selectedUser) {
      alert("コメントまたはユーザーが選択されていません。");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, userId: selectedUser }),
      });
      if (!response.ok) {
        throw new Error("サーバーからのレスポンスが正常ではありません。");
      }
      const newComment = await response.json();
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");

      setSelectedUser("");
    } catch (error) {
      console.error("コメントの投稿に失敗しました:", error);
    }
  };

  const saveReply = async (commentId, userId, content) => {
    const response = await fetch("http://localhost:5000/api/replies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, userId, content }),
    });
    const newReply = await response.json();
    setReplies((prevReplies) => [newReply, ...prevReplies]);
  };

  const updateComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  const deleteReply = (replyId) => {
    setReplies((prevReplies) =>
      prevReplies.filter((reply) => reply.id !== replyId)
    );
  };


  const deleteComment = (deletedCommentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId)
    );
  };

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
        {comments.filter(Boolean).map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            users={users}
            replies={replies.filter((reply) => reply.comment_id === comment.id)}
            saveReply={saveReply}
            updateComment={updateComment}
            deleteComment={deleteComment} 
            deleteReply={deleteReply}
          />
        ))}
      </div>
      <div className="post">
        <form className="postForm" onSubmit={handlePostSubmit}>
          <select value={selectedUser} onChange={handleUserChange} required>
            <option value="">ユーザーを選択</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
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
