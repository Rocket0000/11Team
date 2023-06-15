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

const Modify = () => {
  
  const size = ['15%','85%'];
  const type = ['text','input'];
  const boardTitle = ["카테고리", "제목"];
  const token = localStorage.getItem('accessToken');
  const location = window.location.href.split('/');
  const navigation = useNavigate();

  
    
  const [ md, setMd ] = useState<string | undefined>('');
  const [ inputContent, setInputContent ] = useState('');
  const [ text, setText ] = useState(0);
  const [ noSavePopup, setNoSavePopup ] = useState(false);
  const [ nullTitle, setNullTitle ] = useState(false);
  const [ nullContent, setNullContent ] = useState(false);


  const categoryLabel = text === 0 ?
                          "축구" : text === 1 ?
                          "야구" : text === 2 ?
                          "e-스포츠" : ''


  const getPostConetnt = async () => {
    try{
        await axios.get(`http://localhost:5500/api/v1/post/${location[6]}`)
          .then((res)=> {
            setText(res.data.data.category);
            setInputContent(res.data.data.title);
            setMd(res.data.data.content);
          }).catch((err) => {
            console.error('정보를 불러오지 못했습니다!', err)
          })
    }catch{
      console.error('errr')
    }
  }

  useEffect(() => {
    getPostConetnt()
  },[])

  
  console.log('input, dropDown, md:::', inputContent,text, md); 

 

  const postPut = async () => {
    try{
      axios.put(`http://localhost:5500/api/v1/post/${location[6]}`,{
        title: inputContent,
        content: md,
        img: ''
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('전송상태:::', res.status);
        navigation('/mypage/MyWrite');

      }).catch((err) => {
        console.log('err:::', err);
      })
    }catch{
      console.error('등록하지 못했습니다.');
    }
  }

  const postPutHandler = () => {
    if(inputContent === ''){
      return setNullTitle(true)
    }
    if(md === ''){
      return setNullContent(true)
    }
    postPut()
  }

  const postPutCancelHandler = () => {
    setNoSavePopup(true)
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
                  inputValue={inputContent}
                  setInput={setInputContent}
                  text={categoryLabel}
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
            content="수정"
            disabled={false}
            onClick={postPutHandler}
          />
          <Button 
            purpose="reportPost"
            content="취소"
            disabled={false}
            onClick={postPutCancelHandler}
          />
        </BtnGroup>
        </SectionTag>
      </BoardBg>
      <Popup
        title="제목은 필수 입니다."
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setNullTitle(false)}
        open={nullTitle}
      />
      <Popup
        title="내용은 필수 입니다."
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setNullContent(false)}
        open={nullContent}
      />
      <Popup
        title={`작성 하신 글 취소하면\n 저장되지 않습니다. \n그래도 취소 하시겠습니까?`}
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setNoSavePopup(false)}
        open={noSavePopup}
      />
    </div>

  )
}

export default Modify;


const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;

  width: 354px;
  margin: 42px auto;
`

