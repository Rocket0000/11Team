import React from "react";
import { useLocation } from "react-router-dom";

import Shorts from "./shorts";

interface DetailShortsProps {
  id: number | null;
  category?: number | null;
}

const DetailShorts = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const idParam = queryParams.get("id");
  const categoryParam = queryParams.get("category");

  const id = idParam ? parseInt(idParam) : null;
  const category = categoryParam ? parseInt(categoryParam) : null;

  const detailShortsProps: DetailShortsProps = {
    id,
    category,
  };

  return <Shorts {...detailShortsProps} />;
};

export default DetailShorts;
