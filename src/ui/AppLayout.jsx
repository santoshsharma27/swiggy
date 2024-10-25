import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../utils/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { USERNAME } from "../utils/constant";

const AppLayout = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const data = { name: USERNAME };
    setUserName(data.name);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser: userName }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default AppLayout;
