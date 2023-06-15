import React, { ReactNode, FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled from "styled-components";
import RecordHeader from '../components/Record/RecordHeader';

interface RecordTableProps {
    headerTitle: ReactNode[];
    teamHeaderElements: ReactNode[];
    tbodyData: ReactNode;
    teamDatas: ReactNode;
    selectedSeasonCallback: (selectedSeason: string) => void
};

const RecordPage: FC<RecordTableProps> = ({ headerTitle, teamHeaderElements, tbodyData, teamDatas, selectedSeasonCallback }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    // 오늘 날짜 가져오기
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();


    const cols = [
        "5%",   // 첫 번째 열(순위) 너비
        "20%",  // 두 번째 열(팀) 너비
        ...new Array(headerTitle.length - 2).fill("8%"),  // 나머지 열 너비
    ];

    const colgroupElements = cols.map((colWidth, index) => (
        <Col key={index} width={colWidth} />
    ));

    return (
        <>
            <Container>
                <RecordHeader selectedSeasonCallback={selectedSeasonCallback} />
                {!isMobile &&
                    <TodayDivDesktop>※{year}년 {month}월 {day}일 기준</TodayDivDesktop>
                }
                {isMobile &&
                    <TodayDivMobile>{('' + year).slice(-2)}.{month < 10 ? '0' + month : month}.{day < 10 ? '0' + day : day}</TodayDivMobile>
                }

                {!isMobile &&
                    <DesktopTableWrap>
                        <Table>
                            <colgroup>
                                {colgroupElements}
                            </colgroup>
                            <Thead>
                                <tr>
                                    {headerTitle}
                                </tr>
                            </Thead>
                            <Tbody>
                                {tbodyData}
                            </Tbody>
                        </Table>
                    </DesktopTableWrap>
                }

                {isMobile &&
                    <MobileTableWrap>
                        <FirstTable>
                            <RankTeamTable>
                                <colgroup>
                                    {colgroupElements}
                                </colgroup>
                                <Thead>
                                    <tr>
                                        {teamHeaderElements}
                                    </tr>
                                </Thead>
                                <Tbody>
                                    {teamDatas}
                                </Tbody>
                            </RankTeamTable>
                        </FirstTable>

                        <SecondTable>
                            <RankScrollTable>
                                <colgroup>
                                    {colgroupElements}
                                </colgroup>
                                <Thead>
                                    <tr>
                                        {headerTitle}
                                    </tr>
                                </Thead>
                                <Tbody>
                                    {tbodyData}
                                </Tbody>
                            </RankScrollTable>
                        </SecondTable>
                    </MobileTableWrap>
                }
            </Container>
        </>
    );
}

export default RecordPage;

const Container = styled.div`
    position: relative;
    padding: 30px 162px;

    @media (max-width: 1024px){
        padding: 30px 0;
        margin: 0 auto;
    }

    @media (max-width: 767px) {
        padding: 20px 0;
    }
`

const TodayDivDesktop = styled.div`
    position: relative;
    margin: 0 auto;
    padding: 20px 0;
    text-align: right;
    @media (max-width: 1024px){
        padding-right: 15px;
    }
`

const TodayDivMobile = styled.div`
    position: absolute;
    display: block;
    padding: 0;
    top: 47px;
    right: 10px;
    text-align: right;
`

const DesktopTableWrap = styled.div`
    position: relative;
`

const MobileTableWrap = styled.div`
    position: relative;
`

const Table = styled.table`
    width: 100%;
    position: relative;
    text-align: center;
`

const Col = styled.col`
    width: ${(props) => props.width};
    
    @media (max-width: 767px) {
        width: initial;

        &:nth-child(1) {
        width: 40px;
    }

    &:nth-child(2) {
        width: 140px;
    }
}
`

const Thead = styled.thead`
    height: 44px;
    background-color: #f7f7f7;
    font-weight: bold;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    th {
        vertical-align: middle;
    }

    @media (max-width: 767px) {
        height: 40px;
    }
`

// 행 홀수, 짝수별로 배경 색 다르게 하기
const Tbody = styled.tbody`
    tr:nth-child(even) {
        background-color: #FBFAFE;
    }
    tr:nth-child(odd) {
        background-color: #ffffff;
    }
`

const FirstTable = styled.div`
    width: 180px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

const SecondTable = styled.div`
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap; 
    scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`

const RankTeamTable = styled(Table)`
    width: 100%;
`

const RankScrollTable = styled(Table)`
    width: max-content;
    min-width: 100%;
`