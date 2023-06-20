import classes from "./Navigation.module.css";

const MainNavList = () => {
  return (
    <ul className={classes.nav__list}>
      <li>
        <button>
          <p>Men</p>
        </button>
      </li>
      <li>
        <button>
          <p>Women</p>
        </button>
      </li>
      <li>
        <button>
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
