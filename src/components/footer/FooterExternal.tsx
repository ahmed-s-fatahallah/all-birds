import Image from "next/image";
import Link from "next/link";

import classes from "./FooterExternal.module.css";

const FooterExternal = () => {
  return (
    <div className={classes["footer-external"]}>
      <div className={classes["footer-external__container"]}>
        <div className={classes["footer-external__container__follow"]}>
          <h3>Follow the Flock</h3>
          <p>
            Exclusive offers, a heads up on new things, and sightings of
            Allbirds in the wild. Oh, we have cute sheep, too. #weareallbirds
          </p>
          <ul>
            <li>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/allbirds"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Image
                    data-src="//cdn.allbirds.com/image/upload/q_auto/cms/7ALf4NFNH4VStmrXU0qSKK/0aa03178ac1a2dc0789703f6dac6e7ef/social-instagram.svg"
                    alt="Social Icon - Instagram"
                    src="//cdn.allbirds.com/image/upload/q_auto/cms/7ALf4NFNH4VStmrXU0qSKK/0aa03178ac1a2dc0789703f6dac6e7ef/social-instagram.svg"
                    width={18}
                    height={16.69}
                  />
                </div>
              </a>
            </li>
            <li>
              <a
                aria-label="Twitter"
                href="https://twitter.com/allbirds"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Image
                    data-src="//cdn.allbirds.com/image/upload/q_auto/cms/7jsrb2oMQypD1kO6iZLXZN/8bbcbd3f4c776e7150954f053aee3c00/social-twitter-white.svg"
                    alt="Social Icon - Twitter"
                    src="//cdn.allbirds.com/image/upload/q_auto/cms/7jsrb2oMQypD1kO6iZLXZN/8bbcbd3f4c776e7150954f053aee3c00/social-twitter-white.svg"
                    width={18}
                    height={16.69}
                  />
                </div>
              </a>
            </li>
            <li>
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/weareallbirds"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Image
                    data-src="//cdn.allbirds.com/image/upload/q_auto/cms/55ZLXdMQu728huA78Qlfkb/faa7706d3b83f77d73026e3cfdaca7d0/social-facebook.svg"
                    alt="Social Icon - Facebook"
                    src="//cdn.allbirds.com/image/upload/q_auto/cms/55ZLXdMQu728huA78Qlfkb/faa7706d3b83f77d73026e3cfdaca7d0/social-facebook.svg"
                    width={18}
                    height={16.69}
                  />
                </div>
              </a>
            </li>
            <li>
              <a
                aria-label="Pinterest"
                href="http://pinterest.com/weareallbirds"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Image
                    data-src="//cdn.allbirds.com/image/upload/q_auto/cms/5VBkylibm5XkgzjDP153Mo/e3d80019f111cf8652618aa05ca5528e/social-pinterest-white.svg"
                    alt="Social Icon - Pinterest"
                    src="//cdn.allbirds.com/image/upload/q_auto/cms/5VBkylibm5XkgzjDP153Mo/e3d80019f111cf8652618aa05ca5528e/social-pinterest-white.svg"
                    width={18}
                    height={16.69}
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div className={classes["footer-external__container__logo"]}>
          <div>
            <Image
              data-src="//cdn.allbirds.com/image/upload/f_auto,q_auto/cms/1X4EOQF1JJOjMbo48vDUzB/c249da5825f9ae39f1f53bdb90d65285/icon-b-corp.svg"
              alt="B Corporation Logo"
              src="//cdn.allbirds.com/image/upload/f_auto,q_auto/cms/1X4EOQF1JJOjMbo48vDUzB/c249da5825f9ae39f1f53bdb90d65285/icon-b-corp.svg"
              width={78}
              height={119.92}
            />
          </div>
        </div>

        <div className={classes["footer-external__container__flags"]}>
          <ul>
            <li>
              <Link aria-label="United States" href="https://www.allbirds.com/">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/3ohqY3WWyehlkYpVi815p9/6f7fbf2f1e4a08abc8da4788a95c2376/flag-us.svg"
                  alt="US flag"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/3ohqY3WWyehlkYpVi815p9/6f7fbf2f1e4a08abc8da4788a95c2376/flag-us.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="New Zealand" href="https://www.allbirds.co.nz">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/22gqFXi2QPoT2IhEpBuzOi/d01a77d603e94a10b8a690deded124f7/flag-nz.svg"
                  alt="Shop Flag - NZ"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/22gqFXi2QPoT2IhEpBuzOi/d01a77d603e94a10b8a690deded124f7/flag-nz.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="Australia" href="https://www.allbirds.com.au">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/6FnrOphj9NsjD38uREtsBn/cbf3c42e92a6c0628da4462b04e92e2c/flag-au.svg"
                  alt="Shop Flag - AU"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/6FnrOphj9NsjD38uREtsBn/cbf3c42e92a6c0628da4462b04e92e2c/flag-au.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="Canada" href="https://www.allbirds.ca">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/mpzswQHoLPhzgFkXpcZ7P/eba356c7c7929352d5d3eea6999f5ad3/flag-ca.svg"
                  alt="Shop Flag - CA"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/mpzswQHoLPhzgFkXpcZ7P/eba356c7c7929352d5d3eea6999f5ad3/flag-ca.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="UK" href="https://www.allbirds.co.uk">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/5OVl6dmwlwOJPrg5F3Ot1s/e9679772ddd64de49cd96cbd4a819743/flag-uk.svg"
                  alt="Shop Flag - UK"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/5OVl6dmwlwOJPrg5F3Ot1s/e9679772ddd64de49cd96cbd4a819743/flag-uk.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="China" href="https://www.allbirds.cn">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/2bpMfDa3leuCSpX1lLXKvB/19c74fd77f850e29497ad82d91e83292/flag-cn.svg"
                  alt="Shop Flag - China"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/2bpMfDa3leuCSpX1lLXKvB/19c74fd77f850e29497ad82d91e83292/flag-cn.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="EU" href="https://www.allbirds.eu">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/5DEtULZUsBHTJp8aXcaOIc/c9d3ff14bde3bf45235f906dfb63f649/method-draw-image.svg"
                  alt="EU Flag"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/5DEtULZUsBHTJp8aXcaOIc/c9d3ff14bde3bf45235f906dfb63f649/method-draw-image.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="JP" href="https://www.allbirds.jp">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/3TWBjQxibzqkiXua4hrmCu/1730ec7122e70b26bd29d972733a8190/Japan-Flag.svg"
                  alt="Japan flag icon"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/3TWBjQxibzqkiXua4hrmCu/1730ec7122e70b26bd29d972733a8190/Japan-Flag.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
            <li>
              <Link aria-label="KR" href="https://www.allbirds.co.kr">
                <Image
                  data-src="//cdn.allbirds.com/image/upload/q_auto/cms/lqp21Rk7GI8HTImpSTOip/cdb1a8e18b337c27e91c18b82dd93ddf/South-Korea-Flag.svg"
                  alt="South Korea flag icon"
                  src="//cdn.allbirds.com/image/upload/q_auto/cms/lqp21Rk7GI8HTImpSTOip/cdb1a8e18b337c27e91c18b82dd93ddf/South-Korea-Flag.svg"
                  width={37}
                  height={22}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterExternal;
