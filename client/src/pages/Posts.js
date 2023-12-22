import { BiAddToQueue } from "react-icons/bi";
import { usePost } from "../context/postContext";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { useEffect } from "react";

function Posts() {
  const { posts, getPosts } = usePost();

  useEffect(() => {
    getPosts();
  });
  if (posts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-white text-2xl">There are no posts</h1>
        <Link to="/new" className="px-3 py-2 text-white rounded-md">
          <BiAddToQueue className="w-44 h-44 text-white" />
        </Link>
      </div>
    );
  }

  return (
    <div className="text-white">
      <header className="flex justify-between py-4 ">
        <h1 className="text-2xl text-gray-300 font-bold bg-indigo-700 rounded-md ">
          Posts ({posts.length}).
        </h1>
        <Link
          to="/new"
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-7 00 text-white rounded-md"
        >
          Create a New Post
        </Link>
      </header>
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
