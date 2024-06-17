import React from "react";
import "../Styles/MyPage.css";

const MyPage = () => {
  return (
    <div className="my-page-container">
      <div className="page-content">
        <div className="user-info">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2020/12/AP/QI/NQ/14784178/groot1.jpg"
            alt="友達の画像"
          />
          <span className="username">momo</span>
          <span className="created-at">createdAt</span>
        </div>
        <div className="self-introduction">
          <h2>自己紹介</h2>
          <p>
            i am momo。Impressive! Though it seems the drag feature could be
            improved.Impressive! Though it seems the drag feature could be improved.
          </p>
        </div>
      </div>
      <div className="comments-list">
        <div className="comment">
          <div className="content">コメントの内容</div>
          <div className="created-at">createdAt</div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
