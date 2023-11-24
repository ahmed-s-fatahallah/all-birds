"use client";
import Link from "next/link";

import classes from "./NavListMenu.module.css";

const NavListMenu = (props: {
  onBackdropClickHandler: () => void;
  navMenuName: string;
}) => {
  const navRoutes = {
    title: "Shoes",
    mainLink: `${props.navMenuName}`,
    subLinks: [
      {
        title: "Everyday Seakers",
        link: `${props.navMenuName}-runners`,
      },
      {
        title: "Slip-Ons",
        link: `${props.navMenuName}-loungers`,
      },
      {
        title: `${props.navMenuName === "mens" ? "Golf Shoes" : "Flats"}`,
        link: `${
          props.navMenuName === "mens" ? "/" : `${props.navMenuName}-flats`
        }`,
      },
      {
        title: "Active Shoes",
        link: `${props.navMenuName}-running-shoes`,
      },
      {
        title: "Hiking-Shoes",
        link: `${
          props.navMenuName === "mens"
            ? `${props.navMenuName}-trail-runners-swt`
            : `${props.navMenuName}-hiking-shoes`
        }`,
      },
      {
        title: "Water-Repellent Shoes",
        link: `${props.navMenuName}-mizzles`,
      },
      {
        title: "High Tops",
        link: `${props.navMenuName}-high-tops`,
      },
      {
        title: "sale",
        link: `sale-${props.navMenuName}-shoes`,
      },
      {
        title: "Shop all",
        link: `${props.navMenuName}`,
      },
    ],
  };
  return (
    <div className={classes["nav-menu-container"]}>
      <div className={classes["nav-menu"]}>
        <ul className={classes["nav-menu__list"]}>
          <li>
            <h4 onClick={props.onBackdropClickHandler}>
              <Link href={`/collections/${navRoutes.mainLink}`}>
                {navRoutes.title}
              </Link>
            </h4>
            <ul>
              {navRoutes.subLinks.map((link, i) => (
                <li key={i} onClick={props.onBackdropClickHandler}>
                  <Link href={`/collections/${link.link}`}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h4>Best Sellers</h4>
            <ul>
              <li>Tree Runner</li>
              <li>Tree Dasher 2</li>
              <li>Wool Runner</li>
              <li>Trail Runner SWT</li>
              <li>Tree Lounger</li>
              <li>Tree Dasher Relay</li>
              <li>Shop all</li>
            </ul>
          </li>
          <li>
            <h4>Featured</h4>
            <ul className={classes["nav-menu__list__featured"]}>
              <li>
                <p>Tree Flyer, now on sale</p>
              </li>
              <li>
                <p>Summer Styles</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={classes.backdrop} onClick={props.onBackdropClickHandler}>
        &nbsp;
      </div>
    </div>
  );
};

export default NavListMenu;
