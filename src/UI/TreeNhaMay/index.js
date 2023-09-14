import React from "react";

import { useSelector } from "react-redux";
import TreeScreen from "./TreeScreen";

const TreeListNhaMay = () => {
  const isShowTree = useSelector((state) => state.app.showTree);

  return isShowTree && <TreeScreen />;
};

export default TreeListNhaMay;
