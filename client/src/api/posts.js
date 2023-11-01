import axios from "axios";

export const getPostsRequests = async () =>
  await axios.get("https://mern-back-iota.vercel.app/posts");

export const createPostRequests = async (post) => {
  if (post.image) {
    const datita = new FormData();
    datita.append("file", post.image);
    datita.append("upload_preset", "posteos");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/djsnbnpyj/upload",
      datita
    );
    post.url = response.data.secure_url;
    post.public_id = response.data.public_id;
  }
  return await axios.post("https://mern-back-iota.vercel.app/posts", post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePostRequests = async (id) =>
  await axios.delete("https://mern-back-iota.vercel.app/posts/" + id);

export const getPostRequest = async (id) =>
  await axios.get("https://mern-back-iota.vercel.app/posts/" + id);

export const updatePostRequest = async (id, post) => {
  return await axios.put(
    "https://mern-back-iota.vercel.app/posts/" + id,
    post,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
