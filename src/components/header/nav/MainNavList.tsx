"use client";

import classes from "./Navigation.module.css";

const MainNavList = (props: { navMenu: (name: string) => void }) => {
  return (
    <ul className={classes.nav__list}>
      <li>
        <button onClick={props.navMenu.bind(null, "mens")}>
          <p>Men</p>
        </button>
      </li>
      <li>
        <button onClick={props.navMenu.bind(null, "womens")}>
          <p>Women</p>
        </button>
      </li>
      <li>
        <button onClick={props.navMenu.bind(null, "kids")}>
          <p>Kids</p>
        </button>
      </li>
      <li>
        <button>
          <p>Socks</p>
        </button>
      </li>
      <li>
        <button>
          <p className={classes.sale}>Sale</p>
        </button>
      </li>
    </ul>
  );
};

export default MainNavList;
