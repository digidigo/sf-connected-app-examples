import { useState, useEffect } from "react";
import { parse } from "cookie";
import "../styles/globals.css";
import { CookieProvider } from "../contexts/useCookieContext";
import { LoadingProvider } from "../contexts/useLoadingContext";

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
      <div className="flex flex-col h-screen w-screen">
        <LoadingProvider>
          <CookieProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </CookieProvider>
        </LoadingProvider>
      </div>
    </>
  );
}

export default MyApp;
