// components/LoadingSpinner.js
import { useLoading } from "../contexts/useLoadingContext";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50 bg-gray-500">
      <ClipLoader color="#ffffff" />
    </div>
  );
};

export default LoadingSpinner;
