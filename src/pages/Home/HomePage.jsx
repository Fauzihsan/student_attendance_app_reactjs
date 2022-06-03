import React from "react";
import { AUTH } from "../../utils/helpers/AuthCookies";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function HomePage() {
  let navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#24507b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        AUTH.setLogout(navigate);
      }
    });
  };
  return (
    <>
      <div onClick={handleLogout} className="aSide cursor-pointer">
        <div className="flex flex-row gap-x-5 px-5 justify-start w-full">
          <RiLogoutBoxRLine style={{ fontSize: "24px" }} />
          Logout
        </div>
      </div>
    </>
  );
}

export default HomePage;
