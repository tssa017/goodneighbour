import { useRef } from "react";
import axios from "axios";

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();

  const login = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/login";
    try {
      const response = await axios.post(url, userInfo,  {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      });
      const data  = response.data;
      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    login(userInfo, setCurrUser);
    e.target.reset();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">Login</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mb-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Login
        </button>
        <div className="text-center text-gray-600">
          Not registered yet?{" "}
          <a
            href="#signup"
            onClick={handleClick}
            className="text-indigo-500 hover:underline"
          >
            Signup
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
