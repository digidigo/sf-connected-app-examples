import { useRouter } from "next/router";
import { HomeIcon, CircleStackIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <button
        onClick={() => navigateTo("/")}
        className="flex items-center focus:outline-none"
      >
        <HomeIcon className="h-6 w-6 text-blue-500 mr-2" />
        <span>Home</span>
      </button>
      <button
        onClick={() => navigateTo("/test-mongo")}
        className="flex items-center focus:outline-none"
      >
        <CircleStackIcon className="h-6 w-6 text-blue-500 mr-2" />
        <span>Test MongoDB</span>
      </button>
    </header>
  );
}
