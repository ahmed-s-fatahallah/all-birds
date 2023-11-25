"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SizesFilters from "./SizesFilters";

import classes from "./Sidebar.module.css";
import { useState } from "react";

const Sidebar = () => {
  const [currentRouteName, setCurrentRouteName] = useState("Men's Shoes");
  const pathname = usePathname();
  const routes = pathname.split("/");

  const mensSideBarLinks: { [key: string]: string } = {
    "mens-runners": "Everyday Sneakers",
    "mens-running-shoes": "Active Shoes",
    "mens-loungers": "Slip-Ons",
    "mens-trail-runners-swt": "Hiking Shoes",
    "mens-mizzles": "Water-Repellent-Shoes",
    "mens-high-tops": "High Tops",
    "sale-mens-shoes": "Sale Shoes",
  };

  return (
    <aside className={classes.sidebar}>
      <div>
        <div>
          <span>
            <Link href="/">Home</Link> /&nbsp;
          </span>
          {routes[2] === "mens" ? (
            ""
          ) : (
            <span onClick={() => setCurrentRouteName("Men's Shoes")}>
              <Link href={`/collections/mens`}>Men&apos;s shoes</Link> /
            </span>
          )}
        </div>
        <h1>{mensSideBarLinks[routes[2]] || currentRouteName}</h1>
        <ul className={classes.links__list}>
          {Object.entries(mensSideBarLinks).map((entry, i) => (
            <li key={i} onClick={() => setCurrentRouteName(entry[1])}>
              <Link href={entry[0]}>{entry[1]}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={classes.filterby__container}>
          <p>Filter By:</p>
        </div>
        <h4>Sizes</h4>
        <div className={classes.filter__container}>
          <p>
            Most of our shoes only come in full sizes. If you’re a half size,
            select your nearest whole size too.
          </p>
          <SizesFilters />
        </div>
        <h4>Best For</h4>
        <div className={classes.filter__container}>
          <ul>
            <li>
              <input type="checkbox" name="wet" id="wet" />
              <label htmlFor="wet">Wet Weather</label>
            </li>
            <li>
              <input type="checkbox" name="cool" id="cool" />
              <label htmlFor="cool">Cool Weather</label>
            </li>
            <li>
              <input type="checkbox" name="everyday" id="everyday" />
              <label htmlFor="everyday">Everyday</label>
            </li>
          </ul>
        </div>
        <h4>Material</h4>
        <div className={classes.filter__container}>
          <ul>
            <li>
              <input type="checkbox" name="soft" id="soft" />
              <label htmlFor="soft">Soft & Cozy Wool</label>
            </li>
            <li>
              <input type="checkbox" name="light" id="light" />
              <label htmlFor="light">Lightweight & Durable Canvas</label>
            </li>
          </ul>
        </div>
        <h4>HUE</h4>
        <div className={classes.filter__container}>
          <ul className={classes["colors-filters-list"]}>
            <li>
              <button>Black</button>
            </li>
            <li>
              <button>blue</button>
            </li>
            <li>
              <button>green</button>
            </li>
            <li>
              <button>grey</button>
            </li>
            <li>
              <button>
                <div></div>
                white
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
