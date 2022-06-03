import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "../../api/Model/QueryModel";
import { AUTH } from "../../utils/helpers/AuthCookies";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineMail, AiOutlineSecurityScan } from "react-icons/ai";
// import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import "./LoginPage.css";

function LoginPage() {
  const [togglePasswordIcon, setTogglePasswordIcon] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [getUser, { data, loading }] = useLazyQuery(GET_USER);

  let navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setTogglePasswordIcon(true);
  };

  useEffect(() => {
    if (password === "") {
      setTogglePasswordIcon(false);
    }
  }, [password]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    getUser({
      variables: { email, password },
    });
  };

  useEffect(() => {
    if (data?.users.length === 1) {
      AUTH.setLogin(data?.users[0].email);
      return navigate("/admin");
    }
  }, [data, navigate]);

  return (
    <div className="mainLogin flex lg:flex-row flex-col gap-x-10 gap-y-5 justify-center items-center">
      <img src={require("../../assets/img/ftLogo.png")} alt="Logo Fakultas Teknik UNSUR" className="left-0 lg:flex md:flex hidden opacity-50" />
      <div className="box flex flex-col lg:p-10 p-3 lg:w-1/2 w-5/6 lg:h-3/4 h-1/2 justify-center items-center">
        <h1 className="title text-center lg:text-3xl text-xl">
          Absensi Fakultas Teknik <br /> Universitas Suryakancana
        </h1>
        <div className="flex flex-col items-center justify-center lg:p-5 py-5 w-full">
          <h1 className="title text-center lg:text-2xl text-xl">Sign In</h1>
          <form action="" onSubmit={handleLogin} className="w-full">
            <div className="p-3 flex flex-row gap-x-2">
              <AiOutlineMail className="text-2xl" />
              <input type="email" value={email} onChange={handleChangeEmail} className="inputField w-full bg-transparent placeholder:text-white" required placeholder="Email" />
            </div>
            <div className="p-3 relative flex flex-row gap-x-2">
              <AiOutlineSecurityScan className="text-2xl" />
              <input type={showPassword === false ? "password" : "text"} value={password} onChange={handleChangePassword} className="inputField w-full bg-transparent placeholder:text-white " required placeholder="Password" />
              <div className={togglePasswordIcon === true ? "text-2xl top-3 right-5 absolute" : "hidden"}>{showPassword === false ? <AiOutlineEye onClick={toggleShowPassword} /> : <AiOutlineEyeInvisible onClick={toggleShowPassword} />}</div>
            </div>
            <div className="text-center p-3">
              <button type="submit" className="btn-login text-center px-10 py-2 relative">
                {loading ? "Loading ... " : "Continue"}
              </button>
            </div>
            {data && <h2 className="text-center text-red-300 font-bold">Username or Password is Wrong!</h2>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
