import SizeFilterBtn from "@/utilities/SizeFilterBtn";

import classes from "./SizesFilters.module.css";

const SizesFilters = () => {
  return (
    <div className={classes.sizes__container}>
      <SizeFilterBtn size="8" />
      <SizeFilterBtn size="9" />
      <SizeFilterBtn size="10" />
      <SizeFilterBtn size="11" />
      <SizeFilterBtn size="12" />
      <SizeFilterBtn size="13" />
      <SizeFilterBtn size="14" />
      <SizeFilterBtn size="15" />
    </div>
  );
};

export default SizesFilters;
