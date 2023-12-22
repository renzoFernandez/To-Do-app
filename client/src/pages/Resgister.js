import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signup, isAuthenticated, errors } = useAuth();
  useEffect(() => {
    if (isAuthenticated) navigate("/posts");
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <h1 className="text-white font-bold text-2xl py-3">REGISTER</h1>
        <div>
          {errors.map((err, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {err}
            </div>
          ))}
        </div>
        <Formik
          initialValues={user}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is requerid"),
            email: Yup.string().required("Email is requerid").email(),
            password: Yup.string()
              .required("Password is requerid")
              .min(6, "Password must have at least 6 characters"),
          })}
          onSubmit={async (values, actions) => {
            signup(values);
          }}
          enableReinitialize={true}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                className="text-sm block font-bold text-gray-400"
                htmlFor="username"
              >
                Username
              </label>
              <Field
                name="username"
                placeholder="username"
                className="px-3 py-2 focus:outline-none rounded  w-full mb-2 bg-gray-600"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="username"
              />

              <label
                className="text-sm block font-bold text-gray-400"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                name="email"
                placeholder="email"
                className="px-3 py-2 focus:outline-none rounded  w-full bg-gray-600  "
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="email"
              />

              <label
                className="text-sm block font-bold text-gray-400 py-1"
                htmlFor="password"
              >
                Password
              </label>

              <Field
                type="password"
                name="password"
                placeholder="password"
                className="px-3 py-2 focus:outline-none rounded  w-full bg-gray-600  "
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="password"
              />

              <button
                className=" bg-green-900 text-white font-bold py-2 px-4 rounded-full  mt-2 hover:bg-green-700 "
                type="submit"
                disabled={isSubmitting}
              >
                Register!
              </button>
            </Form>
          )}
        </Formik>
        <p className="flex gap-x-2 justify-between text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Sing in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
