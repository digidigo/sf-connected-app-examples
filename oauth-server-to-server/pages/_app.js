import { useState, useEffect } from "react";
import { parse } from "cookie";
import "../styles/globals.css";

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

  return <Component {...pageProps} user={user} />;
}

export default MyApp;
