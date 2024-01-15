import classes from "./ProductDescriptionSection.module.css";
import Image from "next/image";

export default function ProductDescriptionSection() {
  return (
    <section>
      <div className={classes["product-photos-grid"]}>
        <div>
          <Image
            src="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_860/cms/5Jik1aEjDwjZGVfnBSznul/f12167a46bfb3b1abfe858009ead7028/TR-Desktop__PDP_BTF-1.jpg"
            alt="big display image"
            width={735}
            height={476}
          />
          <div className={classes["description-section__text-wrapper"]}>
            <h4>Tree Upper</h4>
            <h3>Silky And Breezy</h3>
            <p>
              Our proprietary knit feels silky smooth, breathable, and
              pleasantly cool thanks to eucalyptus tree fiber responsibly
              sourced from FSC® Certified forests.
            </p>
          </div>
        </div>
        <div>
          <Image
            src="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_860/cms/3pKvnZNTDIwEfBAiQqUGKv/62ddfb766757f6a442f0f159925dedf6/TR-Desktop__PDP_BTF-2.jpg"
            alt="big display image"
            width={735}
            height={476}
          />
          <div className={classes["description-section__text-wrapper"]}>
            <h4>SUGARCANE MIDSOLE</h4>
            <h3>Sweet On The Planet</h3>
            <p>
              Contoured and delightfully bouncy, our Brazilian sugarcane midsole
              is called SweetFoam®, which is made with the world’s first carbon
              negative green EVA.
            </p>
          </div>
        </div>
        <div>
          <Image
            src="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_860/cms/3CLeqgsBFXlGKEg516fX8B/1f121f7523896325db13a6fd7c0d3c71/TR-Desktop__PDP_BTF-4.jpg"
            alt="big display image"
            width={735}
            height={476}
          />
          <div className={classes["description-section__text-wrapper"]}>
            <h4>RECYCLED LACES</h4>
            <h3>Loop And Swoop</h3>
            <p>
              Our laces are made from 100% post-consumer recycled polyester. One
              old plastic bottle becomes one pair of shoelaces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
