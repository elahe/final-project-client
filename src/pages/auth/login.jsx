import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import service from "../../services/config.services";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("All fields are required (email, password)");
      return;
    }
    const body = {
      email,
      password,
    };

    try {
      const response = await service.post(`/auth/login`, body);
      console.log("you are loggedIn", response);
      //navigate(/products)

      localStorage.setItem("authToken", response.data.authToken);
      // update the context states
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setLoggedUserRole(response.data.payload.role);
      navigate("/")
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage); // error coming from the BE
      } else {
        // navigate to error page
        navigate("/not-found");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login
          </h2>

          <label className="block">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="block">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          {errorMessage && (
            <>
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>

              <span className="block text-center">
                <Link
                  to={`/signup`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Signup
                </Link>
              </span>
            </>
          )}
        </form>
      </div>
    </>
  );
}
