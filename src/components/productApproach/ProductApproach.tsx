import classes from "./ProductApproach.module.css";

import Link from "next/link";

export default function ProductApproach() {
  return (
    <div className={classes["approach-container"]}>
      <div className="container">
        <h2>The Allbirds Approach</h2>
        <ul>
          <li>
            <h3>Wear-All-Day Comfort</h3>
            <p>
              Lightweight, bouncy, and wildly comfortable, Allbirds shoes make
              any outing feel effortless. Slip in, lace up, or slide them on and
              enjoy the comfy support.
            </p>
            <Link href="#">Learn More</Link>
          </li>
          <li>
            <h3>Sustainability In Every Step</h3>
            <p>
              From materials to transport, we’re working to reduce our carbon
              footprint to near zero. Holding ourselves accountable and striving
              for climate goals isn’t a 30-year goal—it’s now.
            </p>
            <Link href="#">Learn More</Link>
          </li>
          <li>
            <h3>Materials From The Earth</h3>
            <p>
              We replace petroleum-based synthetics with natural alternatives
              wherever we can. Like using wool, tree fiber, and sugar cane.
              They’re soft, breathable, and better for the planet—win, win, win.
            </p>
            <Link href="#">Learn More</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
