import FooterNav from "./FooterNav";
import FooterExternal from "./FooterExternal";
import FooterPrivacy from "./FooterPrivacy";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <FooterNav />
        <FooterExternal />
        <FooterPrivacy />
      </div>
    </footer>
  );
};

export default Footer;
