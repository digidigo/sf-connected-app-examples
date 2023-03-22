import { useState, useEffect } from "react";
import { parse } from "cookie";
import "../styles/globals.css";
import { CookieProvider } from "../contexts/useCookieContext";
import { LoadingProvider } from "../contexts/useLoadingContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
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
            <Header />
            <div className="flex-grow bg-gray-100 flex items-center justify-center">
              <div className="flex-grow bg-gray-100 flex items-center justify-center">
                <Component {...pageProps} />
              </div>
            </div>
            <Footer />
            <LoadingSpinner />
            <ToastContainer />
          </CookieProvider>
        </LoadingProvider>
      </div>
    </>
  );
}

export default MyApp;
