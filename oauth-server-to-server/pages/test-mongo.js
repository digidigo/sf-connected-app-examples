import { useState } from "react";
import Header from "../components/Header";
export default function TestMongo() {
  const [message, setMessage] = useState("");

  const testMongoConnection = async () => {
    try {
      const response = await fetch("/api/test-mongo");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error: Unable to fetch the test result.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded shadow-md">
          <h1 className="text-xl font-bold mb-4">Test MongoDB Connection</h1>
          <button
            onClick={testMongoConnection}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Test Connection
          </button>
          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </div>
      </div>
    </>
  );
}
