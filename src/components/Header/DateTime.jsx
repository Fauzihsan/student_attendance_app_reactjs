import React, { useEffect, useState } from "react";
import { AUTH } from "../../utils/helpers/AuthCookies";

function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  return (
    <div className=" lg:w-1/6 w-max text-center py-2 lg:px-5">
      <h1 className="text-primary-grey font-weight-bold dark:text-white lg:text-sm text-xs">{AUTH.getRole() !== "4" ? date.toLocaleString() : AUTH.getFullname()}</h1>
    </div>
  );
}

export default DateTime;
