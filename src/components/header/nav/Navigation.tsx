"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainNavList from "./MainNavList";
import SecondaryNavList from "./SecondaryNavList";
import NavListMenu from "./NavListMenu";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const [navMenu, setNavMenu] = useState({
    isNavOpen: false,
    NavName: "",
  });

  const navListHandler = (name: string) => {
    setNavMenu({ isNavOpen: true, NavName: name });
  };

  const onBackdropClickHandler = () => {
    setNavMenu({ isNavOpen: false, NavName: "" });
  };

  return (
    <div>
      <nav className={classes.nav}>
        <MainNavList navMenu={navListHandler} />
        <Link href="/" className={classes.logo}>
          <Image
            alt="All birds Logo"
            src="//cdn.allbirds.com/image/upload/v1571355713/icons/allbirds-logo.svg"
            width={120}
            height={38.14}
            onClick={onBackdropClickHandler}
          />
        </Link>
        <SecondaryNavList />
      </nav>

      {navMenu.isNavOpen && (
        <NavListMenu
          onBackdropClickHandler={onBackdropClickHandler}
          navMenuName={navMenu.NavName}
        />
      )}
    </div>
  );
};

export default Navigation;
