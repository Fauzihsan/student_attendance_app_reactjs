import jsCookie from "js-cookie";

export const AUTH = {
  setLogin: (username, role, fullname) => {
    jsCookie.set("username", username);
    jsCookie.set("color-theme", "light");
    jsCookie.set("role", role);
    jsCookie.set("fullname", fullname);
  },

  setAuth: () => {
    if (jsCookie.get("username")) {
      return true;
    } else {
      return false;
    }
  },

  getAuth: () => {
    return jsCookie.get("username");
  },

  getTheme: () => {
    return jsCookie.get("color-theme");
  },

  getRole: () => {
    return jsCookie.get("role");
  },

  getFullname: () => {
    return jsCookie.get("fullname");
  },

  setLogout: (navigate) => {
    jsCookie.remove("username");
    jsCookie.remove("color-theme");
    jsCookie.remove("role");
    jsCookie.remove("fullname");
    navigate("/");
  },
};
