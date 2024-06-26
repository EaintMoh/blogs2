import React, { useState, useEffect } from "react";
import "../Styles/Friends.css";

const Friends = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch("http://localhost:5000/api/users");
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="friends-container">
      <div className="friends-list">
        <h2>友達リスト</h2>
        <p>人数：{users.length}名</p>
        {users.map((user) => (
          <div className="friend" key={user.id}>
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2020/12/AP/QI/NQ/14784178/groot1.jpg"
              alt="友達の画像"
            />
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
