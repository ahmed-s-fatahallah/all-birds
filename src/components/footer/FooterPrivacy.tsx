import classes from "./FooterPrivacy.module.css";

import Link from "next/link";

const FooterPrivacy = () => {
  return (
    <div className={classes["footer-privacy__container"]}>
      <p>
        © 2022 Allbirds, Inc. All Rights Reserved.&nbsp;
        <Link
          href="https://www.allbirds.com/pages/allbirds-terms-of-use"
          title="Terms"
        >
          Terms
        </Link>
        ,&nbsp;
        <Link
          href="https://www.allbirds.com/pages/privacy-policy"
          title="Privacy"
        >
          Privacy
        </Link>
        &nbsp;&amp;&nbsp;
        <Link
          href="https://www.allbirds.com/pages/accessibility"
          title="Accessibility"
        >
          Accessibility
        </Link>
        <br />
        <br />
        <button>Do Not Sell My Personal Information</button>
      </p>
    </div>
  );
};

export default FooterPrivacy;
