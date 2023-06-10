import React from "react";
import styled from "styled-components";

import { BoardBg } from "./BoardBg";

interface BoardProps {
  colNum : number;
  trNum : number;
  tdNum : number;
  colSpan : number;
  purpose : 'edit' | 'detail';
}

interface InfoProps{
  title: string;
  no : number;
  titleInfo : string;
  category : number;
  date : string;
  nickname : string;
  info : string;
  img? : string;
  report : string;
}


const InfoTdTag:React.FC<InfoProps> = ({ title, no, titleInfo, category, date, nickname, info, img, report }) => {

  return <td style={{border: "2px solid red"}}></td>
}



const Board:React.FC<BoardProps> = ({ colNum, trNum, tdNum, colSpan, purpose }) => {


  return(
    <>
    <BoardBg margin="50px auto">
      <table style={{width: "100%"}}>
        <colgroup>
          <col width="15%"/>
          <col width="85%"/>
        </colgroup>
        <tbody>
          <tr>
            <td style={{border: "2px solid red"}}>Test</td>
            <td style={{border: "2px solid red"}}></td>
          </tr>
          <tr>
            <td style={{border: "2px solid red"}}>Test</td>
            <td style={{border: "2px solid red"}}></td>
          </tr>
        </tbody>
      </table>
      <section style={{ width: "100%", height: "100%"}}>
        내용내용내용
      </section>
    </BoardBg>
    <br/>
    <br/>
    <br/>
    <BoardBg margin="50px auto">
      <table style={{width: "100%"}}>
        <colgroup>
          <col width="13%"/>
          <col width="13%"/>
          <col width="13%"/>
          <col width="13%"/>
          <col width="13%"/>
          <col width="13%"/>
          <col width="13%"/>
          <col width="13%"/>
        </colgroup>
        <tbody>
          <tr>
            <td style={{border: "2px solid red"}}>Test</td>
            <td style={{border: "2px solid red"}} colSpan={colSpan}></td>
          </tr>
          <tr>
            <td style={{border: "2px solid red"}}>Test</td>
            <td style={{border: "2px solid red"}}></td>
            <td style={{border: "2px solid red"}}>Test</td>
            <td style={{border: "2px solid red"}}></td>
            <td style={{border: "2px solid red"}}>Test</td>
            <td style={{border: "2px solid red"}}></td>
            <td style={{border: "2px solid red"}}>Test</td>
            <td style={{border: "2px solid red"}}></td>
          </tr>
        </tbody>
      </table>
      <section style={{ width: "100%", height: "100%"}}>
        내용내용내용
      </section>
    </BoardBg>
    </>
  );
}

export default Board;