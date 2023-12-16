import classes from "./SizesFilters.module.css";
import Button from "@/utilities/Button";

const SizesFilters = () => {
  return (
    <div className={classes.sizes__container}>
      <Button variant="filter-btn">
        <span>8</span>
      </Button>
      <Button variant="filter-btn">
        <span>9</span>
      </Button>
      <Button variant="filter-btn">
        <span>10</span>
      </Button>
      <Button variant="filter-btn">
        <span>11</span>
      </Button>
      <Button variant="filter-btn">
        <span>12</span>
      </Button>
      <Button variant="filter-btn">
        <span>13</span>
      </Button>
      <Button variant="filter-btn">
        <span>14</span>
      </Button>
      <Button variant="filter-btn">
        <span>15</span>
      </Button>
    </div>
  );
};

export default SizesFilters;
