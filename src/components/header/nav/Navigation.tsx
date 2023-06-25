import Image from "next/image";
import Link from "next/link";
import MainNavList from "./MainNavList";
import SecondaryNavList from "./SecondaryNavList";
import NavListMenu from "./NavListMenu";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div>
      <nav className={classes.nav}>
        <MainNavList />
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
      <NavListMenu />
    </div>
  );
};

export default Navigation;
