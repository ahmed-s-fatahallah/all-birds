import Link from "next/link";

import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={classes.sidebar}>
      <div>
        <div>Home /</div>
        <h1>Men&apos;s Shoes</h1>
        <ul className={classes.links__list}>
          <li>
            <Link href="mens-runners">Everyday Sneakers</Link>
          </li>
          <li>
            <Link href="mens-running-shoes">Active Shoes</Link>
          </li>
          <li>
            <Link href="mens-loungers">Slip-Ons</Link>
          </li>
          <li>
            <Link href="mens-trail-runners-swt">Hiking Shoes</Link>
          </li>
          <li>
            <Link href="/products/suger-sliders">Sandals</Link>
          </li>
          <li>
            <Link href="mens-mizzles">Water-Repellent-Shoes</Link>
          </li>
          <li>
            <Link href="mens-high-tops">High Tops</Link>
          </li>
          <li>
            <Link href="mens-high-tops">Sale Shoes</Link>
          </li>
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
          <div className={classes.sizes__btn__container}>
            <button>
              <span>8</span>
            </button>
            <button>
              <span>9</span>
            </button>
            <button>
              <span>10</span>
            </button>
            <button>
              <span>11</span>
            </button>
            <button>
              <span>12</span>
            </button>
            <button>
              <span>13</span>
            </button>
            <button>
              <span>14</span>
            </button>
          </div>
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
