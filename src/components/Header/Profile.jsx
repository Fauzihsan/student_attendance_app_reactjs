import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { Dropdown } from "flowbite-react";
import Swal from "sweetalert2";

import { AUTH } from "../../utils/helpers/AuthCookies";
import { GET_ONE_USER } from "../../api/Model/Query/GetOneUser";

function Profile() {
  const { data } = useQuery(GET_ONE_USER, { variables: { username: AUTH.getAuth() } });
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
    <Dropdown label={<FaUserCircle size={30} className="dark:text-white" />} arrowIcon={false} inline={true}>
      {data?.users.map((u) => (
        <div key={u.id}>
          <Dropdown.Header>
            <span className="block text-xs">{u.role.name}</span>
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
  );
}

export default Profile;
