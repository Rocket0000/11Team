import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dropdown from "./../../components/common/Dropdown";
import TableList from "./../../components/common/TableList";

const apiUrl = process.env.REACT_APP_API_URL;

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const token = localStorage.getItem("accessToken");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const BASE_URL = "http://localhost:5500";

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const parseJwt = (token: any) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const decodedToken = JSON.parse(jsonPayload);
      return decodedToken;
    } catch (error) {
      console.log("토큰 역파싱 실패", error);
      return null;
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}user/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredPosts = response.data.data.filter(
        (post: any) => post.user_id === getUserIdFromToken()
      );
      setPosts(filteredPosts);
    } catch (error) {
      console.error("게시글 가져오기 실패:", error);
    }
  };

  const getUserIdFromToken = () => {
    const decodedToken = parseJwt(token);
    return decodedToken?.user_id;
  };

  const handleDropdownSelect = (selectedItem: any) => {
    setSelectedCategory(selectedItem === 4 ? null : selectedItem);
    setPage(1);
  };

  const filterPosts = () => {
    if (selectedCategory === null) {
      return posts;
    } else {
      return posts.filter(
        (post: any) => post.category === parseInt(selectedCategory)
      );
    }
  };

  return (
    <div className="mh500">
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <h2 className="pageTitle" style={{ marginRight: "auto" }}>
          작성글 보기
        </h2>
        <Dropdown
          allCategory={true}
          purpose="small"
          dropdownSelect={handleDropdownSelect}
        />
      </div>
      {posts.length > 0 ? (
        <TableList
          show="my"
          data={filterPosts()}
          total={filterPosts().length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      ) : (
        <p>게시글이 없습니다. 글을 작성하고, 소식을 나누세요!</p>
      )}
    </div>
  );
};

export default MyPostsPage;
