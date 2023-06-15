import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TrTag from "../../components/common/board/table/TrTag";
import ColGroupTag from "../../components/common/board/table/ColGroup";

import MDEditor from '@uiw/react-md-editor';

import { BoardBg } from "../../components/common/board/BoardBg";
import { TableTag } from "../../components/common/board/table/TableTag";
import { SectionTag } from "../../components/common/board/table/SectionTag";
import Button from "../../components/common/Button/Button";
import Popup from "../../components/common/Popup";
import styled from "styled-components";

const Edit = () => {
  
  const size = ['15%','85%'];
  const type = ['select','input'];
  const boardTitle = ["카테고리", "제목"];
  const token = localStorage.getItem('accessToken');
  const location = window.location.href.split('/');
  const navigation = useNavigate();


  const [ dropDownNum, setDropDownNum ] = useState(0);
  const [ inputContent, setInputContent ] = useState('');
  const [ md, setMd ] = useState<string | undefined>('');

  const [ showCancelPopup, setShowCancelPopup ] = useState(false);
  const [ allCategoryPopup, setAllCategoryPop ] = useState(false);
  const [ emptyTitle, setEmptyTitle ] = useState(false);
  const [ emptyContent, setEmptyContent ] = useState(false);

  const postAdd = async () => {
    try{
      await axios.post('http://localhost:5500/api/v1/post/',{
        category: dropDownNum,
        title: inputContent,
        content: md
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('전송상태:::', res.status);
        navigation(`/${location[3]}/notice`);

      }).catch((err) => {
        console.log('err:::', err);
      })
    }catch{
      console.error('등록하지 못했습니다.');
    }
  }

  useEffect(() => {
    postAdd()
  },[])

  const postAddHandler = () => {
    if(dropDownNum === 4){
      return setAllCategoryPop(true)
    }
    if(inputContent === ''){
      return setEmptyTitle(true)
    }
    if(md === ''){
      return setEmptyContent(true)
    }
    postAdd()
  }

  const postAddCancelHandler = () => {
    setShowCancelPopup(true)
  }
  

  return(
    <div style={{padding: '0 162px'}}>
      <BoardBg margin="50px auto" height="1080px">
        <TableTag>
          <ColGroupTag 
            trCount={size}
            widthSize={size}
          />
          <tbody>
            {
              type.map((_, idx) => 
                <TrTag 
                  key={idx}
                  trType={type[idx]}
                  thTitle={boardTitle[idx]}
                  rowType="edit"
                  setInput={setInputContent}
                  setDropDown={setDropDownNum}
                />
              )
            }
          </tbody>
        </TableTag>
        <SectionTag>
        <div data-color-mode="light">
          <MDEditor height={839} value={md} onChange={setMd} />
        </div>  
        <BtnGroup>
          <Button 
            purpose="base"
            content="등록"
            disabled={false}
            onClick={postAddHandler}
          />
          <Button 
            purpose="reportPost"
            content="취소"
            disabled={false}
            onClick={postAddCancelHandler}
          />
        </BtnGroup>
        </SectionTag>
      </BoardBg>
      <Popup
        title="전체는 카테고리로 지정 할 수 없습니다."
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setAllCategoryPop(false)}
        open={allCategoryPopup}
      />
      <Popup
        title="제목은 필수 입니다."
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setEmptyTitle(false)}
        open={emptyTitle}
      />
      <Popup
        title="내용은 필수 입니다."
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setEmptyContent(false)}
        open={emptyContent}
      />
      <Popup
        title={`작성 하신 글 취소하면\n 저장되지 않습니다. \n그래도 취소 하시겠습니까?`}
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setShowCancelPopup(false)}
        open={showCancelPopup}
      />
    </div>

  )
}

export default Edit;


const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;

  width: 354px;
  margin: 42px auto;
`

