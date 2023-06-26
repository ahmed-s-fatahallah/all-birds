import classes from "./NavListMenu.module.css";

const NavListMenu = () => {
  return (
    <div className={classes["nav-menu-container"]}>
      <div className={classes["nav-menu"]}>
        <ul className={classes["nav-menu__list"]}>
          <li>
            <h4>Shoes</h4>
            <ul>
              <li>Everyday Sneakers</li>
              <li>Active Shoes</li>
              <li>Slip-Ons</li>
              <li>Golf Shoes</li>
              <li>Hiking Shoes</li>
              <li>Sandals</li>
              <li>Water-Repellent Sneakers</li>
              <li>High Tops</li>
              <li>Sale</li>
              <li>Shop all</li>
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
      <div className={classes.backdrop}>&nbsp;</div>
    </div>
  );
};

export default NavListMenu;
