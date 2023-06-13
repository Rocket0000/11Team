import React from "react";
import styled from "styled-components";

import category from '../../../../category.json';
import Dropdown from "../../Dropdown";
import Input,{InputStyledProps} from "../../Input";


//API연결 때 지울거예정
import testData from '../../../../boardTest.json';


type Type = 'edit' | 'colSpanType' | 'default';

interface TrTypeProps{
  rowType? : Type;
  thTitle : string; 
  trType? : string;//'edit' | 'select'
  colSpan? : number;
  inputProps? : InputStyledProps;

  tdContent? : object;//detail페이지에 들어갈 데이터
}

const TrTag:React.FC<TrTypeProps> = ({ rowType, thTitle, trType, colSpan, inputProps, tdContent }) => {

  const thContent = thTitle.split(',');

  //const data = tdContent ?? {}.data;
  const data = testData.data;//api 붙일때 위에 코드로 변경
  const colSpanData = Object.values(data).slice(0,2);
  const defaultData = Object.values(data).slice(3);

  return(
    <tr>
      {(() => {
           switch(rowType){
              case "edit" :
                  return(
                    <>
                      <ThTag>
                        {thTitle}
                      </ThTag>
                      <TdTag>
                      {(() => {
                            switch (trType) {
                              case "select":
                                return <Dropdown items={category} purpose="middle" dropdownSelect={() => console.log('확인')}/>;
                              case "input":
                                return <Input type={inputProps?.type} value={(inputProps?.value) as string} onChange={ e => e } />
                              default:
                                return <p>'error::: select 와 input 중 골라주세요'</p>;
                            }
                          })()}
                      </TdTag>
                    </>
              );
              case "colSpanType":
                return(
                  thContent.map( (item , idx)  => {
                    console.log('item::', item)
                  return(
                    <>
                      <ThTag key={idx}>{item}</ThTag>
                      {
                        item === '제목' ? <TdTag colSpan={colSpan}>{colSpanData[1]}</TdTag> 
                          :
                        <TdTag key={idx}>{
                          colSpanData[idx]
                        }</TdTag>
                      }
                    </>
                  )
                })
              )
              case "default" :
                return(
                  thContent.map((item, idx) => {
                    return(
                      <>
                        <ThTag key={idx}>{item}</ThTag>
                        <TdTag key={idx}>{defaultData[idx]}</TdTag>
                      </>
                    )
                  })
              )
           }
      })()}
    </tr>
  );
} 

export default TrTag;

const ThTag = styled.th`
  height: 47px;
  border: 0;
  

  font-size: 16px;
  font-weight: 700;
  text-align: center;
  line-height: 47px;
  color: #8F90A6;

  background: #EFEAFC;
`;

const TdTag = styled.td`
  padding: 10px 20px;
  border: 0;

  font-size: 16px;
  text-align: left;
  
  color: #323338;
`;