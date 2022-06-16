import React from "react";
import DateTime from "./DateTime";
import Theme from "./Theme";
import Profile from "./Profile";

function Header() {
  return (
    <>
      <div className="flex flex-row absolute justify-end items-center gap-x-3 w-full p-3">
        <DateTime />
        <Theme />
        <Profile />
      </div>
    </>
  );
}

export default Header;
