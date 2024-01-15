import Link from "next/link";

import classes from "./FooterNav.module.css";

const FooterNav = () => {
  return (
    <div className={classes["footer-nav"]}>
      <div>
        <h3>Help</h3>
        <ul>
          <li>
            <Link href="tel:18889638944">1-888-963-8944</Link>
          </li>
          <li>
            <Link href="sms:18142519966">1-814-251-9966 (text)</Link>
          </li>
          <li>
            <Link href="mailto:help@allbirds.com">help@allbirds.com</Link>
          </li>
          <li>
            <Link href="/pages/returns-exchanges">Returns/Exchanges</Link>
          </li>
          <li>
            <Link href="/pages/help">FAQ/Contact Us</Link>
          </li>
          <li>
            <Link href="/pages/afterpay">Afterpay</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>Shop</h3>
        <ul>
          <li>
            <Link href="/collections/mens">Men&apos;s Shoes</Link>
          </li>
          <li>
            <Link href="/collections/womens">Women&apos;s Shoes</Link>
          </li>
          <li>
            <Link href="/collections/mens-apparel">Men&apos;s Apparel</Link>
          </li>
          <li>
            <Link href="/collections/womens-apparel">Women&apos;s Apparel</Link>
          </li>
          <li>
            <Link href="/collections/trino-socks">Socks</Link>
          </li>
          <li>
            <Link href="/collections/gift-cards">Gift Cards</Link>
          </li>
          <li>
            <Link
              href="/pages/refer-a-friend"
              target="_blank"
              rel="noopener noreferrer"
            >
              Refer a Friend
            </Link>
          </li>
          <li>
            <Link
              href="https://allbirds.app.link/e/AweOhG1itbb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the Allbirds App
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li>
            <Link href="https://stores.allbirds.com">Our Stores</Link>
          </li>
          <li>
            <Link href="/pages/our-story">Our Story</Link>
          </li>
          <li>
            <Link href="/pages/our-materials-wool">Our Materials</Link>
          </li>
          <li>
            <Link href="/pages/sustainable-practices">Sustainability</Link>
          </li>
          <li>
            <Link href="https://ir.allbirds.com/">Investors</Link>
          </li>
          <li>
            <Link href="/pages/shoe-care">Shoe Care</Link>
          </li>
          <li>
            <Link href="/pages/partnerships">Partnerships</Link>
          </li>
          <li>
            <Link href="/pages/product-testing">Product Testing</Link>
          </li>
          <li>
            <Link href="/pages/affiliates">Affiliates</Link>
          </li>
          <li>
            <Link href="https://www.allbirds.com/pages/bulk-ordering">
              Bulk Orders
            </Link>
          </li>
          <li>
            <Link href="/pages/careers">Careers</Link>
          </li>
          <li>
            <Link href="/pages/press">Press</Link>
          </li>
          <li>
            <Link
              href="https://cdn.shopify.com/s/files/1/1104/4168/files/Allbirds_CATSA_Disclosure_FINAL.pdf?v=1606779259"
              target="_blank"
              rel="noopener noreferrer"
            >
              California Transparency Act
            </Link>
          </li>
          <li>
            <Link href="/pages/community-offers">Community Offers</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterNav;
