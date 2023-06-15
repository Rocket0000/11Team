import React from "react";
import { useParams } from "react-router-dom";

import Shorts from "./shorts";

interface NavShortsProps {
  category: number;
}

const CATEGORY: { [key: string]: number } = {
  soccer: 0,
  baseball: 1,
  esport: 2,
};

const NavShorts = () => {
  const { sports } = useParams() as { sports: string };

  const navShortsProps: NavShortsProps = {
    category: CATEGORY[sports],
  };

  return <Shorts {...navShortsProps} />;
};

export default NavShorts;
