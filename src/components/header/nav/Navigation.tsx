"use client";

import Image from "next/image";
import Link from "next/link";
import MainNavList from "./MainNavList";
import SecondaryNavList from "./SecondaryNavList";
import NavListMenu from "./NavListMenu";

import classes from "./Navigation.module.css";
import { useState } from "react";

const Navigation = () => {
  const [navMenu, setNavMenu] = useState({
    navStatus: false,
    NavName: "",
  });

  const navListHandler = (name: string) => {
    setNavMenu({ navStatus: true, NavName: name });
  };

  const onBackdropClickHandler = () => {
    setNavMenu({ navStatus: false, NavName: "" });
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
          />
        </Link>
        <SecondaryNavList />
      </nav>

      {navMenu.navStatus && (
        <NavListMenu
          onBackdropClickHandler={onBackdropClickHandler}
          navMenuName={navMenu.NavName}
        />
      )}
    </div>
  );
};

export default Navigation;
