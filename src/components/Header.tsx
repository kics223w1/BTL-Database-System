import Logo from "./Logo";
import {
  HomeIcon,
  UserIcon,
  UserCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItemsInCart } from "../features/cart/cartSlice";

import React from "react";

const Header = () => {
  const items = useSelector(selectItemsInCart);

  return (
    <header className="sticky w-full top-0 bg-white z-20 py-4 border-b shadow-sm border-gray-100">
      <div className="container-max flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-4">
          <Logo />
        </div>

        <ul className="text-zinc-700 ml-auto gap-2 md:gap-4 items-center hidden md:flex">
          <li>
            <Link
              to="/"
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-gray-700" />{" "}
              <p className="hidden md:block">Home</p>
            </Link>
          </li>

          <li>
            <Link
              to="/customer"
              className="p-2 relative hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <UserCircleIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Customer</p>
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className="p-2 relative hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <UserCircleIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Account</p>
            </Link>
          </li>
          <li>
            <Link
              to="/staff"
              className="p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Staff</p>
            </Link>
          </li>
          <li>
            <Link
              to="/restaurant"
              className="p-2 relative hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Restaurant</p>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
