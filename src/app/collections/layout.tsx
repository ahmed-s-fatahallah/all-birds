import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode } from "react";

import classes from "./layout.module.css";

interface props {
  children: ReactNode;
}

const CollectionsLayout = ({ children }: props) => {
  return (
    <main>
      <div className={`container ${classes.collections_Layout}`}>
        <Sidebar />
        {children}
      </div>
    </main>
  );
};

export default CollectionsLayout;
