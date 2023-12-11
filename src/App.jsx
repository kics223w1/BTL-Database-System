import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import useOnlineStatus from "./hooks/useOnlineStatus";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "./features/app/appSlice";

const App = () => {
  const { pathname } = useLocation();
  const isOnline = useOnlineStatus();
  const { isMenuOpen } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    // close menu, if open
    isMenuOpen && dispatch(closeMenu());
  }, [pathname]);

  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
    </>
  );
};

export default App;
