import { useRouter } from "next/router";
import {
  HomeIcon,
  CircleStackIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import DisplayName from "./DisplayName";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookie } from "../contexts/useCookieContext";
import { useLoading } from "../contexts/useLoadingContext";

export default function Header() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const { cookies, clearCookieAndRefresh } = useCookie();
  const { setIsLoading } = useLoading();

  const navigateTo = (path) => {
    router.push(path);
  };

  const testMongoConnection = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/test-mongo");
      const data = await response.json();
      toast.success("Database is connected!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(`DB Erro: ${error.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/refresh-token?userId=${cookies.userId}`
      );
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
    } finally {
      setIsLoading(false);
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
        onClick={() => testMongoConnection()}
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
