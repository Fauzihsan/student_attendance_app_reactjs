import jsCookie from "js-cookie";

export const AUTH = {
  setLogin: (data) => {
    jsCookie.set("email", data);
  },

  setAuth: () => {
    if (jsCookie.get("email")) {
      return true;
    } else {
      return false;
    }
  },

  setLogout: (navigate) => {
    jsCookie.remove("email");
    navigate("/");
  },
};
