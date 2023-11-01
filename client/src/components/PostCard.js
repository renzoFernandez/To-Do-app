import toast from "react-hot-toast";
import { usePost } from "../context/postContext";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";

export function PostCard({ post }) {
  const { deletePost } = usePost();
  const navigate = useNavigate();

  const HandleDelete = (_id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Are you sure do you want to delete? <strong>{_id}</strong>
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => {
                deletePost(_id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3 className="text-2xl">{post.title}</h3>
          <button
            className="bg-red-700 text- hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              HandleDelete(post._id);
            }}
          >
            <AiTwotoneDelete />
          </button>
        </div>
        <p>{post.description}</p>
      </div>
      {post.image && (
        <img
          src={post.image.url}
          className="w-full h-96 object-cover"
          alt="Girl in a jacket"
        />
      )}
    </div>
  );
}
