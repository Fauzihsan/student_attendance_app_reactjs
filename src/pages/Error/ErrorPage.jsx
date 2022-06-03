import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./ErrorPage.css";

function ErrorPage({ code, title }) {
  return (
    <div className="mainErrorPage flex justify-center items-center">
      <Link to="/">
        <FaHome style={{ fontSize: "30px", color: "#fffafa", opacity: "0.5" }} className="absolute left-10 top-5" />
      </Link>
      <div className="boxErrorPage lg:p-10 p-3 w-3/4 h-3/4">
        <div className="flex flex-col items-center justify-center lg:p-5 py-5 gap-y-10">
          <div className="profilePictureErrorPage lg:w-48 lg:h-48 w-24 h-24">
            <img className="" src={require("../../assets/img/ftLogo.png")} alt="" />
          </div>
          <h1 className="message text-center text-3xl">
            <b>{code} : </b> {title}
          </h1>
          <h1 className="message text-center text-xl">we are sorry but the page you requested cannot be displayed by us</h1>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
