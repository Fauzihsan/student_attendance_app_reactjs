import React, { useEffect, useState } from "react";
import { AUTH } from "../utils/helpers/AuthCookies";
import jsCookie from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { GET_ONE_USER } from "../api/Model/Query/GetOneUser";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function Header() {
  const [date, setDate] = useState(new Date());

  const [darkMode, setDarkMode] = useState(false);
  const { data } = useQuery(GET_ONE_USER, { variables: { username: AUTH.getAuth() } });

  const handleToggle = () => {
    setDarkMode(!darkMode);
    if (darkMode === true) {
      jsCookie.set("color-theme", "dark");
    } else {
      jsCookie.set("color-theme", "light");
    }
  };

  useEffect(() => {
    if (AUTH.getTheme() === "dark") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (AUTH.getTheme() === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      background: "#24507b",
      color: "#fff",
      confirmButtonColor: "#3282B8",
      cancelButtonColor: "#D91E11",
      confirmButtonText: "Yes, Logout!",
      focusConfirm: false,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        AUTH.setLogout(navigate);
        window.location.reload();
      }
    });
  };
  return (
    <>
      <div className="flex flex-row absolute justify-end items-center gap-x-3 w-full p-3">
        <div className=" lg:w-1/6 w-max text-center py-2 lg:px-5">
          <h1 className="text-primary-grey font-weight-bold dark:text-white lg:text-sm text-xs">{AUTH.getRole() !== "4" ? date.toLocaleString() : AUTH.getFullname()}</h1>
        </div>
        <button className="w-8 h-8 dark:bg-yellow-400 rounded-full" onClick={handleToggle}>
          {darkMode !== true ? <img src={require("../assets/img/sun.png")} className="overflow-auto" alt="sun icon" /> : <img src={require("../assets/img/moon.png")} alt="moon icon" />}
        </button>
        <Dropdown label={<FaUserCircle size={30} className="dark:text-white" />} arrowIcon={false} inline={true}>
          {data?.users.map((u) => (
            <div key={u.id}>
              <Dropdown.Header>
                <span className="block text-sm">{u.role.name}</span>
                <span className="block truncate text-sm font-medium">{u.fullname}</span>
              </Dropdown.Header>
              <Link to="/akun">
                <Dropdown.Item>Settings</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </div>
          ))}
        </Dropdown>
      </div>
    </>
  );
}

export default Header;
