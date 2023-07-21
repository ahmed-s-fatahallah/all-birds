import classes from "./SizeFilterBtn.module.css";

const SizeFilterBtn = ({ size }: { size: string | number }) => {
  return (
    <button className={classes.size__btn}>
      <span>{size}</span>
    </button>
  );
};

export default SizeFilterBtn;
