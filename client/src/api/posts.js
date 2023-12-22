import axios from "./axios";
import axioss from "axios";
export const getPostsRequests = async () =>
  await axios.get("http://localhost:4000/posts");

export const createPostRequests = async (post) => {
  try {
    if (post.image) {
      const datita = new FormData();
      datita.append("file", post.image);
      datita.append("upload_preset", "posteos");
      const response = await axioss.post(
        "https://api.cloudinary.com/v1_1/djsnbnpyj/upload",
        datita
      );
      post.url = response.data.secure_url;
      post.public_id = response.data.public_id;
    }
    return await axios.post("http://localhost:4000/posts", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePostRequests = async (id) =>
  await axios.delete("http://localhost:4000/posts/" + id);

export const getPostRequest = async (id) =>
  await axios.get("http://localhost:4000/posts/" + id);

export const updatePostRequest = async (id, post) => {
  try {
    if (post.image) {
      const datita = new FormData();
      datita.append("file", post.image);
      datita.append("upload_preset", "posteos");
      const response = await axioss.post(
        "https://api.cloudinary.com/v1_1/djsnbnpyj/upload",
        datita
      );
      post.url = response.data.secure_url;
      post.public_id = response.data.public_id;
    }
    console.log(post);
    return await axios.put("http://localhost:4000/posts/" + id, post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
