import { useRouter } from "next/router";
import Header from "../components/Header";

export default function Home({ user }) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/api/auth?action=login");
  };

  const handleLogout = () => {
    router.push("/api/auth?action=logout");
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {user ? (
          <>
            <div className="bg-white p-10 rounded shadow-md">
              <h1 className="text-xl font-bold mb-4">
                Welcome, {user.profile.displayName}
              </h1>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
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
    </>
  );
}
