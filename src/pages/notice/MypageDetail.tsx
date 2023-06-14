import TrTag from "../../components/common/board/table/TrTag";
import ColGroupTag from "../../components/common/board/table/ColGroup";

import { BoardBg } from "../../components/common/board/BoardBg";
import { TableTag } from "../../components/common/board/table/TableTag";
import { SectionTag } from "../../components/common/board/table/SectionTag";
import Button from "../../components/common/Button/Button";
import BreadCrumb from "../../components/common/board/BreadCrumb";

import MDEditor from "@uiw/react-md-editor";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const MypageDetail = () =>{
  const size = Array(8).fill('11%');
  const getPostId = window.location.href.split('/');

  const [ notice, setNotice ] = useState<any>({});

  const navigtion = useNavigate();

  
  useEffect(() => {
      axios.get(`http://localhost:5500/api/v1/post/${getPostId[6]}`)
        .then((res) => {
          setNotice(res.data.data);
          console.log('res:::',res);
        })
        .catch((err) => {
          console.error('err:::', err);
        })
  },[]);

return(
    <div style={{padding: '0 162px'}}>
      <BoardBg width="100%" margin="24px 0">
        <TableTag>
          <ColGroupTag 
            trCount={size}
            widthSize={size}
          />
          <tbody>
            <TrTag 
              colSpan={7}
              thTitle="번호,제목"
              rowType="colSpanType"
              tdContent={notice}
            />
            <TrTag 
              thTitle={"카테고리,작성일,작성자,조회수"}
              rowType="default"
              tdContent={notice}
            />
          </tbody>
          </TableTag>
          <SectionTag padding="20px" height="auto">
            <div data-color-mode="light">
              <MDEditor.Markdown source={notice.content} />
            </div>
          </SectionTag>
      </BoardBg>
      <SectionTag margin="37px 0 47px" display="flex">
          <div style={{width: '168px'}}>
            <Button
              purpose="base"
              content="글 수정하기"
              disabled={false}
              onClick={() => navigtion(`/myWrite/notice/modify/${notice.id}`)}
            />
          </div>
      </SectionTag>
    </div>
  )
}

export default MypageDetail;
