import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";

export default function UserLayout() {

  const locattion = useLocation()

  const hideFooterRoute = ["/dashboard","/orders","/settings"]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {hideFooterRoute.includes(locattion.pathname) ? null : <Footer />}
      {/* <ChatWidget /> */}
    </div>
  );
}