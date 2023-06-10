import React,{ useRef, useState } from "react";

import TrTag from "../../components/common/board/table/TrTag";
import ColGroupTag from "../../components/common/board/table/ColGroup";

import { Editor } from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';


import { BoardBg } from "../../components/common/board/BoardBg";
import { TableTag } from "../../components/common/board/table/TableTag";
import { SectionTag } from "../../components/common/board/table/SectionTag";
import Button from "../../components/common/Button/Button";
import styled from "styled-components";

const Edit = () => {
  
  const size = ['15%','85%'];
  const type = ['select','input'];
  const boardTitle = ["카테고리", "제목"];

  const editorRef:React.MutableRefObject<any> = useRef();

  const [ content, setContent ] = useState('')

  const onChange = () => {
    const contentData = editorRef.current?.getInstance().getMarkdown();

    setContent(contentData)
  }

  const toolItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['image']
  ]

  return(
    <BoardBg margin="50px auto" height="1200px">
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
              />
            )
          }
        </tbody>
      </TableTag>
      <SectionTag>
        <Editor
          ref={editorRef}
          initialValue={''}//값 get해오면 넣어야함 수정할시 필요
          initialEditType="markdown"
          height="839px"
          theme=""
          usageStatistics={false}
          toolbarItems={toolItems}
          useCommandShortcut={false}
          hideModeSwitch={true}
          onChange={onChange}
          previewStyle="vertical"
        />
      <BtnGroup>
        <Button 
          purpose="base"
          content="등록"
          disabled={false}
          onClick={() => alert('등록')}
        />
        <Button 
          purpose="reportPost"
          content="취소"
          disabled={false}
          onClick={() => alert('팝업 등장')}
        />
      </BtnGroup>
      </SectionTag>
    </BoardBg>
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

