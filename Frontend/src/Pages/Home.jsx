import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState("");
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    // Check if user is logged in (adjust based on your auth logic)
    const userData = localStorage.getItem("userData");
    const token = userData ? JSON.parse(userData).token : null;
    if(userData){
      const data = JSON.parse(userData);
      setId(data.id);
      setFirstname(data.firstname);
    }
    if(token){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }, []);

  const Features = {
    feature1: {
      title: "Secure Notes Storage",
      discription: "Store your notes securely with end-to-end encryption.",
    },
    feature2: {
      title: "Easy Note Organization",
      discription: "Organize your notes with tags and folders for easy access.",
    },
    feature3: {
      title: "Cloud Sync",
      discription: "Sync your notes across all your devices seamlessly.",
    },
    feature4: {
      title: "Rich Text Editing",
      discription: "Create notes with rich text formatting options.",
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 shadow-md z-50">
        <Navbar id={id} login={isLoggedIn ? 'true' : ''} username={firstname} />
      </div>
      <div className="flex flex-col items-center justify-center pt-32 text-center px-4 pb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Welcome to MyNotes
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">
          Your personal note-taking app. Organize your thoughts and ideas securely.
        </p>
        {!isLoggedIn ? (
          <p className="text-base sm:text-lg text-gray-400">
            Please log in to access your notes. <a href="/login" className="text-blue-600">Login here</a>
          </p>
        ): ''}
      </div>
      <div className="flex-1 mt-8 sm:mt-16 flex flex-col items-center justify-center px-4 pb-16">
        <h2 className="text-white text-3xl sm:text-4xl font-bold py-4 mb-8">OUR FEATURES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {Object.entries(Features).map(([key, feature]) => (
            <div key={key} className="bg-linear-to-br from-gray-800 to-gray-700 p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <h3 className="text-white text-xl sm:text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{feature.discription}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
