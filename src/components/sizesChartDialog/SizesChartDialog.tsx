"use-client";
import { MouseEvent, RefObject, useEffect } from "react";
import classes from "./SizesChartDialog.module.css";

export default function SizesChartDialog({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement>;
}) {
  const closeModalHandler = (e: MouseEvent) => {
    if (
      e.target === e.currentTarget ||
      e.currentTarget.getAttribute("type") === "button"
    ) {
      dialogRef.current?.close();
      document.body.style.overflowY = "initial";
    }
  };

  useEffect(() => {
    if (!dialogRef.current) return;
    const dialogEl = dialogRef.current;
    const handleCloseModalWithEscape = () => {
      document.body.style.overflowY = "initial";
    };
    dialogEl.addEventListener("keydown", handleCloseModalWithEscape);
    return () => {
      dialogEl.removeEventListener("keydown", handleCloseModalWithEscape);
    };
  }, [dialogRef]);

  return (
    <dialog
      className={classes["sizes-chart-dialog"]}
      ref={dialogRef}
      onClick={closeModalHandler}
    >
      <div>
        <button
          type="button"
          aria-label="Close Modal"
          title="close button"
          onClick={closeModalHandler}
        >
          <span></span>
        </button>
        <div>
          <h2>Allbirds Size Chart</h2>

          <div>
            <p>
              Allbirds fit true to size for most customers. If you have wide
              feet or are between sizes, we suggest you size up for all styles
              except our Plant Pacer (size down for those).
            </p>
            <p>
              Did you know that our shoes are actually unisex? You can easily
              cross over to find shoes in your size.
            </p>
            <p>
              <strong>Here’s how it works: </strong>
            </p>
            <p>If you wear a men’s size 7, try a women’s size 8 or 9.</p>
            <p>If you wear a women’s size 12, try a men’s size 10 or 11.</p>
          </div>
          <div>
            <div className={classes["table-wrapper"]}>
              <h4>Men&apos;s Shoes</h4>
              <table>
                <tbody>
                  <tr>
                    <th>US</th>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                  </tr>
                  <tr>
                    <th>UK</th>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                  </tr>
                  <tr>
                    <th>EU</th>
                    <td>41</td>
                    <td>42</td>
                    <td>43</td>
                    <td>44</td>
                    <td>45</td>
                    <td>46</td>
                    <td>47</td>
                  </tr>
                  <tr>
                    <th>cm</th>
                    <td>26</td>
                    <td>27</td>
                    <td>28</td>
                    <td>29</td>
                    <td>30</td>
                    <td>31</td>
                    <td>32</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={classes["table-wrapper"]}>
              <h4>Women&apos;s Shoes</h4>
              <table>
                <tbody>
                  <tr>
                    <th>US</th>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                  </tr>
                  <tr>
                    <th>UK</th>
                    <td>2 - 2.5</td>
                    <td>3 - 3.5</td>
                    <td>4-4.5</td>
                    <td>5 - 5.5</td>
                    <td>6 - 6.5</td>
                    <td>7 - 7.5</td>
                    <td>8 - 8.5</td>
                  </tr>
                  <tr>
                    <th>EU</th>
                    <td>35</td>
                    <td>36</td>
                    <td>37</td>
                    <td>38</td>
                    <td>39</td>
                    <td>40</td>
                    <td>41</td>
                  </tr>
                  <tr>
                    <th>cm</th>
                    <td>22</td>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                    <td>26</td>
                    <td>27</td>
                    <td>28</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p>
          Still debating? No worries - our hassle-free 30-day return policy
          allows you to try us on for size and find the perfect pair.
        </p>
      </div>
    </dialog>
  );
}
