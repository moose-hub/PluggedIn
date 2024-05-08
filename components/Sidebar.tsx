// components/Sidebar.tsx
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-96 h-screen bg-gray-50 dark:bg-gray-800 shadow"
      aria-label="Sidebar"
    >
      <div className="px-4 py-4 overflow-y-auto">
        <div className="flex items-center p-3 mb-5">
          <img src="logo.svg" className="h-20 mr-3" alt="Logo" />
          <span className="self-center text-4xl font-semibold whitespace-nowrap text-plugged-in-purple">
            Plugged in
          </span>
        </div>
        <ul className="space-y-5">
          <li>
            <Link
              href="/discover"
              className="block p-3 text-2xl font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out w-full text-center transform hover:scale-105 shadow-md"
            >
              <img
                src="discover.svg"
                alt="Discover"
                className="inline-block mr-2 h-6 w-6"
              />{" "}
              Discover
            </Link>
          </li>
          <li>
            <Link
              href="/likes"
              className="block p-3 text-2xl font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out w-full text-center transform hover:scale-105 shadow-md"
            >
              <img
                src="purple-heart.svg"
                alt="purple heart"
                className="inline-block mr-2 h-6 w-6"
              />{" "}
              Likes
            </Link>
          </li>
          <li>
            <Link
              href="/create-music"
              className="block p-3 text-2xl font-medium text-white bg-plugged-in-purple rounded-lg dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out w-full text-center transform hover:scale-105 shadow-md"
            >
              <img
                src="microphone-white.svg"
                alt="microphone"
                className="inline-block mr-2 h-6 w-6"
              />{" "}
              Create Music
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
