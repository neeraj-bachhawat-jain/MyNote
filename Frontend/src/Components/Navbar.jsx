import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar({ id = "", login = "", username = "" }) {    
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 shadow-lg">
      <div className="box-border cursor-pointer" onClick={() => navigate("/")}>
        <p className="sm:text-xl font-bold font-[Open-sans] hover:text-gray-300 transition">
          <span className="text-red-400 text-2xl">My</span><span className="text-2xl text-blue-400">Notes</span>
        </p>
      </div>
      <ul className="box-border flex gap-4 sm:gap-4 list-none">
        {login && (
        <li className="flex items-center">
          <Link
            to={`/notes/${id}`}
            className="hover:text-blue-400 transition duration-200 font-medium"
          >
            <HomeIcon className="inline-block mr-1 w-5 h-5" />
            Notes
          </Link>
        </li>
        )}
        <li className="flex items-center">
          <Link                    
            to={login ? `/profile/${id}` : "/login"}
            className="hover:text-blue-700 transition duration-200 font-medium"
          >
            <AccountCircleIcon className="inline-block ml-1 w-5 h-5" />
            {login ? `${username}` : "Login"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
