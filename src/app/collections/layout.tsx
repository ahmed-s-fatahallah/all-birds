import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode } from "react";

import classes from "./layout.module.css";

interface props {
  children: ReactNode;
}

const CollectionsLayout = ({ children }: props) => {
  return (
    <div className={`container ${classes.collections_Layout}`}>
      <Sidebar />
      {children}
    </div>
  );
};

export default CollectionsLayout;
