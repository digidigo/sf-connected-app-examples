// components/Footer.js
import React from "react";
import { useCookie } from "../contexts/useCookieContext";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const { cookies, clearCookieAndRefresh } = useCookie();

  const handleLogout = () => {
    //router.push("/api/auth?action=logout");
    clearCookieAndRefresh();
  };

  return (
    <footer className="bg-gray-800 py-4 mt-auto">
      <div className="container mx-auto px-4 flex justify-end">
        {cookies.userId && (
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
