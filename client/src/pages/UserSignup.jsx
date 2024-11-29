import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function UserSignup() {
  const [showPassword, setShowpassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const navigate = useNavigate()

  const newUser = {
    fullName: {
      firstName: firstName,
      lastName: lastName,
    },
    email: email,
    password: password,
  };

  const handleUsersignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signup`,
        newUser,
        { withCredentials: true }
      );
      if (response.data?.success) {
        toast.success(response.data.message);
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        navigate('/user/login')
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to signup server error");
      console.log("Signup error", error);
    }
  };
  return (
    <div className="px-4 flex flex-col  gap-2 md:w-[40%] md:mx-auto">
      <div>
        <h1 className="absolute top-2 left-2 text-black text-2xl font-extrabold border-2  bg-white px-2 py-1 rounded ">
          Caber
        </h1>
        <form
          onSubmit={(event) => handleUsersignup(event)}
          className="mt-20 py-4 "
        >
          <label htmlFor="firstName" className="text-black text-2xl font-bold">
            Your good name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              value={firstName}
              onChange={(event) => setFirstname(event.target.value)}
              className="bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700 mb-8"
            />

            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={(event) => setLastname(event.target.value)}
              className="bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700 mb-8"
            />
          </div>

          <label htmlFor="email" className="text-black text-2xl font-bold">
            Your email{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Registered email"
            className="bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700 mb-8"
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password" className="text-black text-2xl font-bold ">
            Your password{" "}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Registered password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700"
          />
          <p
            className="text-end text-xl font-bold cursor-pointer "
            onClick={() => setShowpassword(!showPassword)}
          >
            {showPassword ? "Hide password" : "show password"}
          </p>

          <button className="w-full rounded-sm mt-5 font-bold text-2xl bg-black text-white py-3">
            SignUp
          </button>
        </form>
        <h2 className="text-xl font-bold text-end">
          Already have an account ?{" "}
          <NavLink to="/user/login" className=" text-blue-500 ">
            Login here
          </NavLink>{" "}
        </h2>
      </div>
      <p className="absolute bottom-2 left-0 w-full px-2 py-4  text-sm rounded-sm font-semibold  ">
        This site is protected by reCaptcha and the{" "}
        <span className="underline">google privacy policy </span> and{" "}
        <span className="underline">Terms of service applied </span>{" "}
      </p>
    </div>
  );
}

export default UserSignup;
