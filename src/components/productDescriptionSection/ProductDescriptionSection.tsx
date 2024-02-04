import { BigImages } from "@/definitions";
import classes from "./ProductDescriptionSection.module.css";
import Image from "next/image";

export default function ProductDescriptionSection({
  data,
}: {
  data: BigImages;
}) {
  return (
    <section>
      <div className={classes["product-photos-grid"]}>
        {data.map((item, i) => (
          <div key={i}>
            <Image
              src={item.img}
              alt="big product display image"
              width={735}
              height={476}
            />
            <div className={classes["description-section__text-wrapper"]}>
              <h4>{item["s-title"]}</h4>
              <h3>{item["b-title"]}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
