import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../utils/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { USERNAME } from "../utils/constant";

const AppLayout = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(USERNAME);
  }, []);

  return (
    <UserContext.Provider value={{ userName }}>
      <div className="flex min-h-screen flex-col">
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
