import { useState, useEffect } from "react";
import { parse } from "cookie";
import "../styles/globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userCookie = parse(document.cookie).user;
      if (userCookie) {
        const userData = JSON.parse(userCookie);
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );}

export default MyApp;
