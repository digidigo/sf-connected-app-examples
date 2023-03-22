import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

import { useCookie } from "../contexts/useCookieContext";

export default function Home({ user }) {
  const router = useRouter();
  const { cookies, clearCookieAndRefresh } = useCookie();

  const handleLogin = () => {
    router.push("/api/auth?action=login");
  };

  const handleLogout = () => {
    //router.push("/api/auth?action=logout");
    clearCookieAndRefresh();
  };

  const handleGetSalesforceInfo = () => {
    router.push("/salesforce-info");
  };

  return (
    <>
      <Header />
      <div className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="flex-grow bg-gray-100 flex items-center justify-center">
          {cookies.userId ? (
            <>
              <div className="bg-white p-10 rounded shadow-md">
                <button
                  onClick={handleGetSalesforceInfo}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Contacts
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
        </div>
      </div>
      <Footer />
      <LoadingSpinner />
    </>
  );
}
