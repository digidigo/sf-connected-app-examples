import { useRouter } from "next/router";
import {
  HomeIcon,
  CircleStackIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import DisplayName from "./DisplayName";
import Cookie from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Header() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const userId = Cookie.get("userId");
    setUserId(userId);
  }, []);

  const navigateTo = (path) => {
    router.push(path);
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get(`/api/refresh-token?userId=${userId}`);
      const { accessToken } = response.data;
      console.log("Access token refreshed:", accessToken);
      toast.success("Access token refreshed successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Error refreshing access token:", error);
      toast.error(`Error refreshing access token: ${error.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <button
        onClick={() => navigateTo("/")}
        className="flex items-center focus:outline-none"
      >
        <HomeIcon className="h-6 w-6 text-blue-500 mr-2" />
      </button>
      <button
        onClick={() => navigateTo("/test-mongo")}
        className="flex items-center focus:outline-none"
      >
        <CircleStackIcon className="h-6 w-6 text-blue-500 mr-2" />
      </button>
      <button
        onClick={() => refreshToken()}
        className="flex items-center focus:outline-none"
      >
        <ArrowPathIcon className="h-6 w-6 text-blue-500 mr-2" />
      </button>
      <DisplayName />
    </header>
  );
}
