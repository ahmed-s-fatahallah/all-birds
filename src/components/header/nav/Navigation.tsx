import Image from "next/image";
import MainNavList from "./MainNavList";
import SecondaryNavList from "./SecondaryNavList";
import Link from "next/link";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <MainNavList />
      <Link href="/" className={classes.logo}>
        <Image
          data-src="//cdn.allbirds.com/image/upload/v1571355713/icons/allbirds-logo.svg"
          alt="All birds Logo"
          src="//cdn.allbirds.com/image/upload/v1571355713/icons/allbirds-logo.svg"
          width={120}
          height={38.14}
        />
      </Link>
      <SecondaryNavList />
    </nav>
  );
};

export default Navigation;
