import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Navigation />
      </header>
      <main className="flex flex-1 justify-center bg-base-200">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
