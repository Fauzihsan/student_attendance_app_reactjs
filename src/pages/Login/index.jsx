import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_USERS } from "../../api/Model/Query/GetUsers";
import { AUTH } from "../../utils/helpers/AuthCookies";
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineUser, AiOutlineSecurityScan } from "react-icons/ai";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";

function LoginPage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [togglePasswordIcon, setTogglePasswordIcon] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [getUser, { data, loading }] = useLazyQuery(GET_USERS);

  let navigate = useNavigate();

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
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
      variables: { username, password },
    });
  };

  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (data?.users.length === 1) {
      AUTH.setLogin(data?.users[0].username, data?.users[0].roles_id, data?.users[0].fullname);
      if (data?.users[0].roles_id === 4) {
        return navigate("/student");
      } else if (data?.users[0].roles_id === 5) {
        return navigate("/lecturer");
      } else {
        return navigate("/admin");
      }
    } else if (data?.users.length === 0) {
      setFailed(true);
    }
  }, [data, navigate]);

  return (
    <div className="mainLogin flex lg:flex-row flex-col gap-x-10 gap-y-5 justify-center items-center">
      <img src={require("../../assets/img/ftLogo.png")} alt="Logo Fakultas Teknik UNSUR" className="left-0 lg:flex hidden opacity-50" />
      <div className="box flex flex-col lg:p-10 p-3 lg:w-1/2 w-5/6 h-max justify-center items-center" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">
        <img src={require("../../assets/img/ftLogo.png")} alt="Logo Fakultas Teknik UNSUR" className="left-0 lg:hidden flex opacity-50 w-32" />
        <h1 className="title text-center lg:text-3xl text-xl">
          Absensi Fakultas Teknik <br /> Universitas Suryakancana
        </h1>
        <div className="flex flex-col items-center justify-center lg:p-5 py-5 w-full">
          <form action="" onSubmit={handleLogin} className="w-full">
            <div className="p-3 flex flex-row gap-x-2 items-center">
              <AiOutlineUser className="text-2xl" size={30} />
              <div className="relative z-0 w-full lg:mb-6 mb-2 group">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChangeUsername}
                  className="inputField w-full outline-none bg-transparent placeholder:text-white block py-2.5 px-0 text-sm text-primary-blue border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  autoComplete="off"
                  required
                />
                <label
                  htmlFor="username"
                  className="peer-focus:font-medium absolute text-sm text-primary-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
              </div>
            </div>
            <div className="p-3 relative flex flex-row gap-x-2 items-center">
              <AiOutlineSecurityScan className="text-2xl" size={33} />

              <div className="relative z-0 w-full mb-6 group">
                <input
                  type={showPassword === false ? "password" : "text"}
                  name="password"
                  value={password}
                  onChange={handleChangePassword}
                  className="inputField w-full outline-none bg-transparent placeholder:text-white block py-2.5 px-0 text-sm text-primary-blue border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  autoComplete="off"
                  required
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-primary-blue duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <div className={togglePasswordIcon === true ? "text-2xl top-3 right-5 absolute" : "hidden"}>{showPassword === false ? <AiOutlineEye onClick={toggleShowPassword} /> : <AiOutlineEyeInvisible onClick={toggleShowPassword} />}</div>
              </div>
            </div>
            <div className="text-center p-3">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-primary-blue rounded-lg group bg-gradient-to-br from-blue-500 to-primary-blue group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">{loading ? <LoadingAnimation /> : "Sign In"}</span>
              </button>
            </div>
            {failed && <h2 className="text-center text-red-300 font-bold">Username or Password is Wrong!</h2>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
