import React,{Dispatch, SetStateAction} from "react";
import styled from "styled-components";

import Dropdown from "../../Dropdown";
import Input from "../../Input";

type Type = 'edit' | 'colSpanType' | 'default';


interface TrTypeProps{
  rowType? : Type;
  thTitle : string; 
  trType? : string;//'edit' | 'select'
  colSpan? : number;
  inputType?: string;
  inputValue?: string | any;

  tdContent? : object;//detail페이지에 들어갈 데이터

  setInput?: Dispatch<SetStateAction<string>> | any;
  setDropDown? : Dispatch<SetStateAction<string>> | any;
}

const TrTag:React.FC<TrTypeProps> = ({ rowType, thTitle, trType, colSpan,  inputType, inputValue, tdContent, setInput, setDropDown }) => {

  const thContent = thTitle.split(',');

  const data = tdContent ?? {};
  // const data = testData.data;//api 붙일때 위에 코드로 변경
  const colSpanData = Object.values(data).slice(0,3);
  const defaultArr = Object.values(data).slice(3);
  const newArr = defaultArr.reverse().slice(0,4);
  const defaultData = [...newArr].reverse();

  {(() => {
    switch(defaultData[0]){
      case 0 :
        return defaultData[0] = '축구';
      case 1 :
        return defaultData[0] = '야구';
      case 2 :
        return defaultData[0] = 'e-sport';
      default:
        return '';
    }
  })()}

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
                                return <Dropdown allCategory={true} purpose="middle" dropdownSelect={(category) => setDropDown(category)}/>;
                              case "input":
                                return <Input type={inputType} value={inputValue} onChange={(e) => setInput(e)} />
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
                        item === '제목' ? <TdTag colSpan={colSpan}>{colSpanData[2]}</TdTag> 
                          :
                        <TdTag key={idx + 1}>{
                          colSpanData[0]
                        }</TdTag>
                      }
                    </>
                  )
                })
              )
              case "default" :
                return(
                  thContent.map((item, idx) => {
                    console.log('default::::')
                    return(
                      <>
                        <ThTag key={idx}>{item}</ThTag>
                        <TdTag key={idx + 1}>{defaultData[idx]}</TdTag>
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
  vertical-align: middle;

  background: #EFEAFC;
`;

const TdTag = styled.td`
  padding: 10px 20px;
  border: 0;

  font-size: 16px;
  text-align: left;
  
  color: #323338;
`;