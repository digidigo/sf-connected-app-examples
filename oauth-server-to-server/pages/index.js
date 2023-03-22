import { useRouter } from "next/router";
import { useCookie } from "../contexts/useCookieContext";
import { useLoading } from "@/contexts/useLoadingContext";
import { toast } from "react-toastify";

export default function Home({ user }) {
  const router = useRouter();
  const { cookies, clearCookieAndRefresh } = useCookie();
  const { setIsLoading } = useLoading();

  const handleLogin = () => {
    setIsLoading(true);
    router.push("/api/auth?action=login");
  };

  const handleLogout = () => {
    //router.push("/api/auth?action=logout");
    clearCookieAndRefresh();
  };

  const handleGetSalesforceInfo = () => {
    router.push("/salesforce-contacts");
  };

  return (
    <>
      {cookies.userId ? (
        <>
          <div className="bg-white p-10 rounded shadow-md">
            <button
              onClick={handleGetSalesforceInfo}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Salesforce Contacts
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white p-10 rounded shadow-md">
          <h1 className="text-xl font-bold mb-4">Welcome, guest</h1>
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login with Salesforce
          </button>
        </div>
      )}
    </>
  );
}
