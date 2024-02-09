import Image from "next/image";

import classes from "./Navigation.module.css";
import Link from "next/link";

const SecondaryNavList = () => {
  return (
    <ul className={classes.nav__list}>
      <li>
        <button>
          <p>Sustainability</p>
        </button>
      </li>
      <li>
        <button>
          <p>Rerun</p>
        </button>
      </li>
      <li>
        <button>
          <p>Stores</p>
        </button>
      </li>
      <li>
        <Link href="#">
          <svg
            width="23"
            height="23"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM13.9542 16.5149C12.5333 17.4536 10.8305 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 11.597 16.9 13.9372 15.1405 15.5799L19.5303 19.9697C19.8232 20.2626 19.8232 20.7374 19.5303 21.0303C19.2374 21.3232 18.7626 21.3232 18.4697 21.0303L13.9542 16.5149Z"
              fill="#212A2F"
            ></path>
          </svg>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <Image
            draggable={false}
            alt="login icon"
            src="//cdn.allbirds.com/image/upload/v1571355713/icons/user.svg"
            width={25}
            height={25}
          />
        </Link>
      </li>
      <li>
        <Link href="#">
          <Image
            draggable={false}
            alt="help icon"
            src="//cdn.allbirds.com/image/upload/v1571947807/icons/help.svg"
            width={25}
            height={25}
          />
        </Link>
      </li>
      <li>
        <button className={classes.nav__list__cart}>
          <svg
            width={34}
            height={31}
            viewBox="0 0 34 31"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <polygon
                id="path-1"
                points="0 0.3672 33.089 0.3672 33.089 21.3842 0 21.3842"
              ></polygon>
              <polygon
                id="path-3"
                points="0 0.00039 22.3713346 0.00039 22.3713346 5.69739 0 5.69739"
              ></polygon>
            </defs>
            <g id="Page-1" fill="none" fillRule="evenodd">
              <text
                x="20"
                y="18"
                textAnchor="middle"
                width="100%"
                stroke="#000"
              >
                0
              </text>
              <g>
                <g transform="translate(0 1)">
                  <g id="Group-3" transform="translate(0 .633)">
                    <mask id="mask-2" fill="#fff">
                      <use xlinkHref="#path-1"></use>
                    </mask>
                    <path
                      d="M8.4296,4.5812 L11.5266,20.1472 L28.3366,19.1582 L31.7276,4.4012 L20.0506,4.4012 L8.4296,4.5812 Z M11.0356,21.3842 C10.7506,21.3842 10.5006,21.1822 10.4446,20.8982 L7.1386,4.2782 L4.5696,1.5742 L0.6036,1.5742 C0.2706,1.5742 -0.0004,1.3042 -0.0004,0.9712 C-0.0004,0.6372 0.2706,0.3672 0.6036,0.3672 L4.8286,0.3672 C4.9946,0.3672 5.1526,0.4352 5.2666,0.5552 L7.9516,3.3812 L20.0416,3.1942 L32.4856,3.1942 C32.6696,3.1942 32.8436,3.2782 32.9576,3.4222 C33.0726,3.5662 33.1156,3.7542 33.0736,3.9332 L29.4116,19.8692 C29.3516,20.1302 29.1266,20.3212 28.8596,20.3362 L11.0726,21.3832 C11.0606,21.3842 11.0486,21.3842 11.0356,21.3842 Z"
                      id="Fill-1"
                      fill="#231F20"
                      mask="url(#mask-2)"
                    ></path>
                  </g>
                  <path
                    d="M29.4276,24.4718 L11.1166,24.4718 C10.7836,24.4718 10.5126,24.2008 10.5126,23.8678 L10.5126,21.4128 C10.5126,21.0798 10.7836,20.8098 11.1166,20.8098 C11.4496,20.8098 11.7206,21.0798 11.7206,21.4128 L11.7206,23.2638 L29.4276,23.2638 C29.7606,23.2638 30.0316,23.5348 30.0316,23.8678 C30.0316,24.2008 29.7606,24.4718 29.4276,24.4718"
                    id="Fill-4"
                    fill="#231F20"
                  ></path>
                  <path
                    d="M14.4169,27.2785 C14.4169,28.5785 13.3629,29.6325 12.0629,29.6325 C10.7629,29.6325 9.7089,28.5785 9.7089,27.2785 C9.7089,25.9785 10.7629,24.9245 12.0629,24.9245 C13.3629,24.9245 14.4169,25.9785 14.4169,27.2785"
                    id="Fill-6"
                    fill="#231F20"
                  ></path>
                  <path
                    d="M30.2723,27.2785 C30.2723,28.5785 29.2183,29.6325 27.9183,29.6325 C26.6183,29.6325 25.5643,28.5785 25.5643,27.2785 C25.5643,25.9785 26.6183,24.9245 27.9183,24.9245 C29.2183,24.9245 30.2723,25.9785 30.2723,27.2785"
                    id="Fill-8"
                    fill="#231F20"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default SecondaryNavList;
