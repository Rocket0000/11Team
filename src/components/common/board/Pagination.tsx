import React, {Dispatch, SetStateAction} from "react";
import styled from "styled-components";

import {ReactComponent as Next} from "../../../assets/icons/Next.svg";
import {ReactComponent as DoubleNext} from "../../../assets/icons/DoubleNext.svg";
import {ReactComponent as Previous} from "../../../assets/icons/Previous.svg"
import {ReactComponent as DoublePrevious} from "../../../assets/icons/DoublePrevious.svg"

interface PaginationProps {
    total: number;
    limit: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;//setState 값을 넘겨야해서 지정해준 타입
}

const Pagination: React.FC<PaginationProps> = ({total, limit, page, setPage}) => {

    const numPages = Math.ceil(total / limit);

    const rangeSize = 10;
    const nearestTen = Math.ceil(page / rangeSize) * rangeSize;

    const startPage = nearestTen - rangeSize + 1;
    const endPage = numPages % 10 === 0 ? nearestTen : numPages;
    
    const showList = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    console.log('showList:::', showList);
    

    return (
        <Nav>
            <PageButton onClick={() => {
                const toPage = page - 5 < 1 ? 1 : page - 5
                setPage(toPage);
            }} disabled={page === 1}>
                <DoublePrevious className="arrowBtn double"/>
            </PageButton>
            <PageButton onClick={() => {
                setPage(page - 1);
            }} disabled={page === 1}>
                <Previous className="arrowBtn"/>
            </PageButton>
            {
                showList.map((value, index) => {
                  
                    return (  
                                <PageButton
                                    key={index}
                                    onClick={() => {setPage(value); console.log("value:", value,"----------------")}}
                                    className={ page === value ?  "page" : "" }
                                >
                                    {value}   
                                </PageButton>
                            )
                }).splice(0, 10)
            }
            <PageButton onClick={() => {
                setPage(page + 1);
            }} disabled={page === numPages}>
                <Next className="arrowBtn"/>
            </PageButton>
            <PageButton onClick={() => {
                const toPage = page + 5 > numPages ? numPages : page + 5
                setPage(toPage);
            }} disabled={page === numPages}>
                <DoubleNext className="arrowBtn double next"/>
            </PageButton>
        </Nav>
    );
}

export default Pagination;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin: 24px auto;
`

const PageButton = styled.button`
  width: 32px;
  height: 32px;
  line-height: 19px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #28293D;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #EFEAFC;
    color: #5F30E2;
    cursor: pointer;
  }

  &:hover svg.arrowBtn path {
    fill: #5F30E2;
  }

  &[disabled] {
    background: transparent;
    cursor: revert;
  }

  &[disabled] svg.arrowBtn path {
    fill: #C7C9D9;
  }

  &.page {
    background: #5F30E2;
    color: #FFF;
    cursor: revert;
  }

  svg.arrowBtn path {
    transform: translate(-5px, -1px);
    fill: #28293D;
  }

  svg.arrowBtn.double path {
    transform: translate(-3px, -1px);
  }

  svg.arrowBtn.double.next path {
    transform: translate(-8px, -1px);
  }
`;
