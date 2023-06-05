import React, { ReactNode, FC } from 'react'
import styled from "styled-components";
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer';

interface RecordTableProps {
    season: string,
    colgroupData: ReactNode[];
    headerTitle: ReactNode[];
    tbodyData: ReactNode;
};

const RecordTable: FC<RecordTableProps> = ({ season, colgroupData, headerTitle, tbodyData }) => {

    // 오늘 날짜 가져오기
    const today = new Date();
    const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    return (
        <>
            <Header />
            <Container>
                <SeasonSelect><span>{season}</span></SeasonSelect>

                <Todaydiv>※{date} 기준</Todaydiv>
                <Table>
                    <colgroup>
                        {colgroupData}
                    </colgroup>
                    <Thead>
                        <tr>
                            {headerTitle}
                        </tr>
                    </Thead>
                    <Tbody>{tbodyData}</Tbody>
                </Table>
            </Container>
            {/* <Footer></Footer> */}
        </>
    );
}

export default RecordTable;

const Container = styled.div`
    position: relative;
    padding: 0 162px 30px 162px;
`

const SeasonSelect = styled.div`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 0;

    span {
        cursor: pointer;

        &:hover {
            color: #5546B7;
        }
    }
`

const Todaydiv = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 10px;
    text-align: right;
`

const Table = styled.table`
    width: 100%;
    text-align: center;
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
