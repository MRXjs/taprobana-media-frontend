import React, { useState } from "react";
import Logo from "../../img/logo.gif";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, signUp } from "../../actions/AuthAction";
import { UilEye } from "@iconscout/react-unicons";
import { UilEyeSlash } from "@iconscout/react-unicons";
import CopyRight from "../../components/copyright/CopyRight";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(LogIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setShowPass(false);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Auth">
      {/*Left Side*/}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Taprobana Media</h1>
          <h6>
            Hello guys, now you have a social media app. Don't worry about
            mistakes here because this is the first version and if you are new
            to Taprobana you are welcome
          </h6>
          <CopyRight />
        </div>
      </div>

      {/*Right side*/}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
              required
            />
          </div>

          <div>
            <input
              type={showPass ? "text" : "password"}
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              required
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? <UilEyeSlash /> : <UilEye />}
            </span>

            {isSignUp && (
              <input
                type={showPass ? "text" : "password"}
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
                required
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer", color: "blue" }}
              onClick={() => (setIsSignUp((prev) => !prev), resetForm())}
            >
              {isSignUp
                ? "Already have an account. Log In!"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button
            className="button infoBotton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "SignUp" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
