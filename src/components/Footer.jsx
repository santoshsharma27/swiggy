import { useEffect, useState } from "react";
import { Linkedin_URL } from "../utils/constant";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const year = new Date().getFullYear();

  // Show button when scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <footer className="relative flex flex-col items-center justify-center bg-white py-5 font-semibold sm:flex-row">
      {/* Top Border */}
      <div className="absolute left-0 right-0 top-0 h-1 border-b shadow-sm" />

      <span className="px-1">Created By</span>
      <a
        className="text-red-500 hover:underline"
        href={Linkedin_URL}
        target="_blank"
        rel="noreferrer"
        title="Santosh Kumar Sharma LinkedIn Profile"
      >
        Santosh Kumar Sharma
      </a>
      <span className="px-1">&copy; {year} All rights reserved</span>

      {/* Scroll to Top Button for Mobile */}
      {isVisible && (
        <button
          className="fixed bottom-5 right-5 block rounded-full bg-red-500 p-3 text-white shadow-md transition duration-300 hover:bg-red-600 sm:hidden"
          onClick={scrollToTop}
          title="Scroll to Top"
        >
          &#8593;
        </button>
      )}
    </footer>
  );
}

export default Footer;
