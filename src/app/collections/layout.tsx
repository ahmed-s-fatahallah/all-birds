import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const CollectionsLayout = ({ children }: props) => {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
};

export default CollectionsLayout;
