import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { cartSelector } from "../store/cart-slice";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const cart = useSelector(cartSelector);

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 w-screen bg-[#e7ecee]">
      <div className="mx-auto flex h-16 w-[90%] max-w-4xl items-center justify-between">
        <Link href="/">
          <div className="relative h-8 w-6 cursor-pointer opacity-80 hover:opacity-100">
            <Image src="/apple-logo.png" layout="fill" objectFit="contain" />
          </div>
        </Link>

        <div className="hidden items-center space-x-6 md:inline-flex">
          <a className="nav_link" href="#product">
            product
          </a>

          <a className="nav_link" href="#explore">
            explore
          </a>

          <a className="nav_link" href="#explore">
            support
          </a>

          <a className="nav_link" href="#product">
            business
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <SearchIcon className="nav_link h-6" />

          <Link href="/checkout">
            <div className="relative">
              {cart.length > 0 && (
                <span className="gradient absolute -top-1 -right-1 z-10 flex h-4 w-4  items-center justify-center rounded-full text-xs ">
                  {cart.length}
                </span>
              )}

              <ShoppingBagIcon className="nav_link h-6" />
            </div>
          </Link>

          {session ? (
            <img
              className="h-8 w-8 cursor-pointer rounded-full"
              onClick={() => signOut()}
              src={
                `${session.user?.image}` ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              loading="lazy"
              alt=""
            />
          ) : (
            <UserIcon className="nav_link h-6" onClick={() => signIn()} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
