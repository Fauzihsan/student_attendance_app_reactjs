import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../api/Model/Mutation/Update/UpdateUsers";
import Swal from "sweetalert2";
import LoadingAnimation from "../../components/Loading/LoadingAnimation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { AUTH } from "../../utils/helpers/AuthCookies";
import { useNavigate } from "react-router";

function Akun() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [togglePasswordIcon, setTogglePasswordIcon] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const location = useLocation();
  const account = location.state;
  const navigate = useNavigate();

  const [updatePassword, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password Berhasil diubah, Silahkan Login Kembali",
        showConfirmButton: false,
        timer: 2200,
      });

      AUTH.setLogout(navigate);
    },
  });

  useEffect(() => {
    if (password === "" && newPassword === "" && confirmPassword === "") {
      setTogglePasswordIcon(false);
    }
  }, [password, newPassword, confirmPassword]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password !== "") {
      if (password !== account.password) {
        setOldPasswordError("Password Lama Salah");
      } else {
        setOldPasswordError("");
      }
    } else {
      setOldPasswordError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);
  useEffect(() => {
    if (confirmPassword !== "") {
      if (confirmPassword !== newPassword) {
        setNewPasswordError("Konfirmasi Password tidak sesuai");
      } else {
        setNewPasswordError("");
      }
    } else {
      setNewPasswordError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword, confirmPassword]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (oldPasswordError === "" && newPasswordError === "") {
      updatePassword({
        variables: {
          username: account.username,
          fullname: account.fullname,
          password: confirmPassword,
        },
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Ada Kesalahan,Periksa Kembali",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className="main bg-primary-white2 dark:bg-primary-black lg:px-7 pt-20 lg:text-xl text-xs h-screen">
        <h1 className="p-3 lg:text-2xl lg:text-left text-lg text-center text-primary-grey dark:text-white">Ubah Password</h1>
        <div className="bg-primary-white dark:bg-primary-grey text-white p-5 h-max w-full">
          <h1 className="p-3 lg:text-2xl text-lg text-center text-primary-grey dark:text-white">{account.fullname}</h1>
          <form onSubmit={handleUpdate}>
            <div className="relative py-2 z-0 w-full group">
              <input
                type={showPassword === false ? "password" : "text"}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setTogglePasswordIcon(true);
                }}
                className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password Lama
              </label>

              <div className={togglePasswordIcon === true ? "text-2xl top-3 right-5 absolute" : "hidden"}>{showPassword === false ? <AiOutlineEye className="dark:text-white" onClick={toggleShowPassword} /> : <AiOutlineEyeInvisible className="dark:text-white" onClick={toggleShowPassword} />}</div>
              <div className="h-6 w-full py-1">
                <h1 className="lg:text-left text-xs text-left text-secondary-red">{oldPasswordError}</h1>
              </div>
            </div>
            <div className="relative py-2 z-0 w-full mb-6 group">
              <input
                type={showPassword === false ? "password" : "text"}
                name="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setTogglePasswordIcon(true);
                }}
                className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                required
              />
              <label
                htmlFor="newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password Baru
              </label>
            </div>
            <div className="relative py-2 z-0 w-full group">
              <input
                type={showPassword === false ? "password" : "text"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setTogglePasswordIcon(true);
                }}
                className="block outline-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                required
              />
              <label
                htmlFor="confirmPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Konfirmasi Password Baru
              </label>
              <div className="h-6 w-full py-1">
                <h1 className="lg:text-left text-xs text-left text-secondary-red">{newPasswordError}</h1>
              </div>
            </div>

            <div className="flex items-center justify-center p-6 space-x-2">
              <button type="submit" className="text-white bg-gradient-to-r from-primary-blue via-blue-800 to-blue-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                {loading ? <LoadingAnimation /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Akun;
