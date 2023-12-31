import { useEffect, useRef, useState } from "react";
import HTTP from "utils/httpClient";

const Home = () => {
  const http = new HTTP();
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const shouldLog = useRef(true);

  useEffect(() => {
    const getComments = async () => {
      const data = await http.GET(
        "https://jsonplaceholder.typicode.com/comments"
      );
      console.log("DATA =>", data);
      setComments(data);
    };
    const getPosts = async () => {
      const data = await http.GET("https://jsonplaceholder.typicode.com/posts");
      console.log("DATA =>", data);
      setPosts(data);
    };

    if (shouldLog.current) {
      shouldLog.current = false;
      getComments();
      getPosts();
    }
  }, [http]);

  console.log("COMMENTS =>", comments);
  console.log("POSTS =>", posts);

  return <div>
    {posts && posts.length && <h1>There is Posts!</h1>}
    {comments && comments.length && <h1>There is Comment!</h1>}
  </div>;
};

export default Home;
