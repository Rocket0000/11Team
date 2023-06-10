import React from "react";

const ColGroupTag:React.FC<{widthSize: string[], trCount: string[]}> = ({ widthSize, trCount }) =>{
  return(
    <colgroup>
      { trCount.map((_, index) => <col key={index} width={widthSize[index]} />) }
    </colgroup>
  );
}

export default ColGroupTag;