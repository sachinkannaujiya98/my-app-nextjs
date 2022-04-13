import axios from "axios";
import { React, useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./Component/Pagination";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  console.table(posts);
  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(res);
    };
    getPost();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatePost = paginate(posts, currentPage, pageSize);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {paginatePost.map((post) => {
            // console.log(post.id);
            return (
              <>
                <tr className="px-2" key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <Pagination
        items={posts.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
