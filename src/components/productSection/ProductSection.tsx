import Button from "@/utilities/Button";
import classes from "./ProductSection.module.css";
import Image from "next/image";
import ProductSlider from "../productSlider/ProductSlider";
import { Product } from "@/definitions";
import ProductAccordion from "../productAccordion/ProductAccordion";

const MOCKDATA = [
  {
    title: "details",
    description: `Our breathable, silky-smooth sneaker made with responsibly sourced eucalyptus tree fiber treads lightly in everything you do.

Best For: Walking, warmer weather, everyday wear

Thermoregulating Material: Lightweight, breathable eucalyptus fiber provides next-level comfort

Versatile Design: Wear-with-everything classic style, great for travel

Where It’s Made: Vietnam. Learn more about our operations`,
  },
  {
    title: "sustainability",
    description: `Our Tree Runner has a carbon footprint of 4.99 kg CO2e. Learn more about carbon footprint labeling and our commitments to reduce our impact.

    As a carbon neutral business certified by Climate Neutral, we balance our emissions by funding high impact carbon projects.
    
    Sustainable Materials:
    
    FSC-certified TENCEL™ Lyocell (eucalyptus tree fiber) upper
    
    SweetFoam® midsole made with sugarcane-based green EVA
    
    Bio-based TPU eyelets
    
    Shoe laces made from recycled plastic bottles
    
    Castor bean oil-based insole foam
    
    ZQ merino wool heel lining
    
    Some models may include a wool-lined insole instead of the TENCEL™-lined insole featured in the image`,
  },
  {
    title: "care guide",
    description: `1. Remove the laces and insoles.

    2. Place shoes in a delicates bag (pro tip: a pillowcase works too).
    
    3. Choose a gentle cycle with cold water & mild detergent.
    
    4. Shake out any excess water & set aside to air dry.
    
    5. Shoes will regain their original shape with one or two wears. 
    
    
    Want the full refresh experience? Swap in some new laces and insoles.`,
  },
  {
    title: "shipping & returns",
    description: `Free shipping on orders over $75, and our 30 days, no questions asked return policy. Lightly worn shoes get donated to Soles4Souls. Visit our Returns Portal.

    Final Sale items cannot be returned or exchanged. Final Sale items include: gift cards, insoles, sock bundles, TrinoXO Face Masks, and items tagged final sale on our website and in Allbirds retail stores.
    
    Need it sooner? See if the style you want is available at a store near you.`,
  },
];

export default function ProductSection({
  productData,
}: {
  productData: Product;
}) {
  return (
    <section className={classes["main-section"]}>
      <ProductSlider
        productColors={productData.colors}
        productVideo={productData.video}
        productDisplayImg={productData.displayImg}
        productVidThumbnail={productData.videoThumbnail}
      />
      <div className={classes["product-options"]}>
        <div className={classes.path}>
          <a href="#">Home</a>/ <a href="#">Men&apos;s shoes</a>/
          <a href="#">Everyday sneakers</a>/
        </div>
        <h1 className={classes["main-product-title"]}>
          Men&apos;s Tree Runners
        </h1>
        <div className={classes["price-container"]}>
          <p>$98</p>
          <div className={classes["free-shipping"]}>FREE SHIPPING</div>
        </div>
        <div className={classes["rating-container"]}>
          <div className={classes.stars}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>

            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Half Full Star</title>
              <defs></defs>
              <path
                className="cls-1"
                d="M23,8.8l-8-1.21L11.51,0,8,7.59,0,8.8l5.75,5.9L4.4,23l7.11-3.93L18.62,23,17.26,14.7ZM17.3,21.15,12,18.22,11.51,18h0V2.37L14.16,8l.23.48.52.08,6,.92L16.55,14l-.36.36.08.5Z"
                transform="translate(-.01 -.02)"
              ></path>
            </svg>
          </div>
          <div className={classes["number-of-reviews"]}>(7219)</div>
        </div>
        <div className={classes["colors-container"]}>
          <div className={classes["color-row"]}>
            <div>
              <span className={classes["colors-type"]}>Classics:</span>
              <span> Mist (white Sole)</span>
            </div>
            <div className={classes["color-select"]}>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
            </div>
          </div>
          <div className={classes["color-row"]}>
            <div>
              <span className={classes["colors-type"]}>limited edition:</span>
              <span> Mist (white Sole)</span>
            </div>
            <div className={classes["color-select"]}>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
            </div>
          </div>
          <div className={classes["color-row"]}>
            <div>
              <span className={classes["colors-type"]}>sale:</span>
              <span> Mist (white Sole)</span>
            </div>
            <div className={classes["color-select"]}>
              <button type="button" className={classes.color}>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <div className={classes["size-container"]}>
          <p>select size</p>
          <ul className={classes["sizes-list"]}>
            <li>
              <Button variant="filter-btn">
                <span>{8}</span>
              </Button>
            </li>
            <li>
              <Button variant="filter-btn">
                <span>{9}</span>
              </Button>
            </li>
            <li>
              <Button variant="filter-btn">
                <span>{10}</span>
              </Button>
            </li>
            <li>
              <Button variant="filter-btn">
                <span>{11}</span>
              </Button>
            </li>
            <li>
              <Button variant="filter-btn">
                <span>{12}</span>
              </Button>
            </li>
            <li>
              <Button variant="filter-btn">
                <span>{13}</span>
              </Button>
            </li>
            <li>
              <Button variant="filter-btn">
                <span>{14}</span>
              </Button>
            </li>
          </ul>
        </div>
        <p className={classes["size-chart-text"]}>
          This style is available in whole sizes only. In between sizes? We
          recommend you size up. <button>See Size Chart</button>
        </p>
        <Button variant="add-to-cart-btn" disabled>
          Select a size
        </Button>
        <div className={classes["promo-banner"]}>
          <h3>Don&apos;t Be Fa-la-late</h3>
          <p>
            Use code <b> GET30 </b> at checkout. <br />
            <u> Exclusions apply </u>
          </p>
        </div>
        <p className={classes["shipping-policy"]}>
          Free shipping on orders over $75. Free returns.
        </p>
        <div className={classes.recommendations}>
          <p>Also consider</p>
          <div className={classes["recommendations__container"]}>
            <div>
              <img
                src="//cdn.allbirds.com/image/fetch/q_auto,f_auto/w_650,f_auto,q_auto/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/7aJZ8e9C8er0utTjy5pSu4/1"
                alt=""
              />
              <p>Title1</p>
            </div>
            <div>
              <img
                src="//cdn.allbirds.com/image/fetch/q_auto,f_auto/w_650,f_auto,q_auto/https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/7aJZ8e9C8er0utTjy5pSu4/1"
                alt=""
              />
              <p>Title2</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.highlights}>
        <h2>Tree Runner Highlights</h2>
        <hr />
        <p>
          Lightweight, breathable eucalyptus fiber provides next-level comfort
        </p>
        <hr />
        <p>Cushioned midsole gives wear-all-day support</p>
        <hr />
        <p>Machine-washable materials keep shoes looking like new</p>
      </div>
      <ProductAccordion productDetails={MOCKDATA} />
      <div className={classes["big-img-container"]}>
        <Image
          draggable={false}
          src="https://cdn.dynamicyield.com/api/8776313/images/116be0f9f3ae6__product_features_module-tr_desktop_intrinsic.jpg"
          alt="product details"
          width={1196}
          height={580}
        />
      </div>
    </section>
  );
}
