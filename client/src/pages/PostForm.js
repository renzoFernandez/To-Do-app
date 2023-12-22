import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePost } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";

function PostForm() {
  const { createPost, getPost, updatePost } = usePost();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post.data);
        console.log("use");
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link
            to="/posts"
            className="text-gray-400 text-sm hover:text-gray-300"
          >
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Titulo requerido"),
            description: Yup.string().required("Descripcion requerido"),
          })}
          onSubmit={async (values, actions) => {
            console.log(values);
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/posts");
          }}
          enableReinitialize={true}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                className="text-sm block font-bold text-gray-400"
                htmlFor="title"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded  w-full mb-2 bg-gray-600"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />

              <label
                className="text-sm block font-bold text-gray-400"
                htmlFor="description"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="description"
                className="px-3 py-2 focus:outline-none rounded  w-full bg-gray-600  "
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />

              <label
                className="text-sm block font-bold text-gray-400 py-1"
                htmlFor="image"
              >
                Image
              </label>

              <input
                type="file"
                id="image"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
                style={post.image ? { display: "none" } : { display: "block" }}
              />
              {post.image && (
                <img
                  src={post.image.url}
                  className="w-full h-96 object-cover"
                  alt="Girl in a jacket"
                />
              )}
              <div className="flex justify-between">
                <button
                  className=" bg-green-900 text-white font-bold py-2 px-4 rounded-full  mt-2 hover:bg-green-700 "
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-54" />
                  ) : (
                    "Save!"
                  )}
                </button>
                {post.image && (
                  <button
                    className="bg-red-700 text- hover:bg-red-500 text-sm px-2 mb-5 rounded-sm "
                    type="button"
                    onClick={() => {
                      console.log("presionado");
                      setPost({
                        ...post,
                        image: null,
                      });
                    }}
                  >
                    <AiTwotoneDelete />
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default PostForm;
