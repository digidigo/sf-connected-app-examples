// contexts/useCookieContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

const CookieContext = createContext();

export const useCookie = () => {
  return useContext(CookieContext);
};

export const CookieProvider = ({ children }) => {
  const [cookies, setCookies] = useState("");

  useEffect(() => {
    let cookies = {};
    cookies.userId = Cookie.get("userId");
    cookies.displayName = Cookie.get("displayName");
    setCookies(cookies);
  }, []);

  const clearCookieAndRefresh = () => {
    Cookie.remove("userId");
    Cookie.remove("displayName");
    setCookies({});
  };

  return (
    <CookieContext.Provider value={{ cookies, clearCookieAndRefresh }}>
      {children}
    </CookieContext.Provider>
  );
};
