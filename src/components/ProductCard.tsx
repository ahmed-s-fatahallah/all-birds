import SizeFilterBtn from "@/utilities/SizeFilterBtn";
import Image from "next/image";

import classes from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <div className={classes["card-container"]}>
      <div className={classes["card-main"]}>
        <div className={classes["card-main__img"]}>
          <Image
            src="https://cdn.allbirds.com/image/upload/f_auto,q_auto/v1/production/colorway/en-US/images/6LZsdZwEZ4Bqkifd1dGl2w/1"
            alt="Men's Tree Runners - Wheat (Beige Sole)"
            width={308}
            height={308}
          />
        </div>
        <p className={classes["card-main__name"]}>Men&apos;s Tree Runners</p>
        <p className={classes["card-main__color"]}>Wheat (Beige sole)</p>
        <p>$105</p>
        <div className={classes["card-main__colors"]}>Colors</div>
      </div>
      <div className={classes["card-secondary"]}>
        <p className={classes["card-secondary__title"]}>Quick Add</p>
        <div>
          <SizeFilterBtn size="10" />
          <SizeFilterBtn size="11" />
          <SizeFilterBtn size="12" />
          <SizeFilterBtn size="13" />
          <SizeFilterBtn size="14" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
