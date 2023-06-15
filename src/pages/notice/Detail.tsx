import TrTag from "../../components/common/board/table/TrTag";
import ColGroupTag from "../../components/common/board/table/ColGroup";

import { BoardBg } from "../../components/common/board/BoardBg";
import { TableTag } from "../../components/common/board/table/TableTag";
import { SectionTag } from "../../components/common/board/table/SectionTag";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input";
import Comment from "../../components/common/Comment";
import BreadCrumb from "../../components/common/board/BreadCrumb";
import Popup from "../../components/common/Popup";

import MDEditor from "@uiw/react-md-editor";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Detail = () =>{
  const size = Array(8).fill('11%');
  const getPostId = window.location.href.split('/');
  const loginCheck = localStorage.getItem('accessToken');

  const navigation = useNavigate();

  const [ notice, setNotice ] = useState<any>({});
  const [ showLoginPopup, setShowLoginPopup ] = useState(false);//로그인팝업 보여주는 상태
  const [ showLengthPopup, setShowLengthPopup ] = useState(false);//500자이하 체크 팝업
  const [ showEmptyPopup, setShowEmptyPopup ] = useState(false);//
  const [ showPostReportPopup, setShowPostReportPopup ] = useState(false);
  const [ comment , setComment] = useState('')//comment 내용
  const [ commentArr, setCommentArr ] = useState<any[]>([]);


    // 토큰 역파싱
    const parseJwt = (token:string) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const decodedToken = JSON.parse(jsonPayload);
        console.log("디코딩된 토큰:", decodedToken);
        return decodedToken;
      } catch (error) {
        console.log("토큰 역파싱 실패", error);
        return null;
      }
    };


  const localUserId = parseJwt(String(loginCheck));
  const tokenUserId = localUserId?.user_id;
  

  useEffect(() => {
      axios.get(`http://localhost:5500/api/v1/post/${getPostId[6]}`)
        .then((res) => {
          setNotice(res.data.data);
        })
        .catch((err) => {
          console.error('err:::', err);
        })
  },[]);

const params = {contents_category: `${notice.category}`}
  useEffect(() => {
    axios.get(`http://localhost:5500/api/v1/comment/list/${getPostId[6]}`,{params})
    .then((res)=>{
      setCommentArr(res.data.data);
    })
    .catch((err)=> {
      console.error('err:::', err);
    })
  },[]);
  
  const postComment = async() => {
    try{
        await axios.post('http://localhost:5500/api/v1/comment/',{
        contents_category: 1,
        id: Number(getPostId[6]),
        content: `${comment}`
      },
      {
        headers: {
          Authorization: `Bearer ${loginCheck}`,
        }
      })
      .then((res) => {
        setComment('')
      })
      .catch((error) => {
        console.error('실패:::', error);
      })

    }catch{
      console.log('등록되지 못함')
    }
  }

  const showPopupHandler = () => {

    if(loginCheck === ''){//쿠키체크(로그인체크여부)
      return setShowLoginPopup(true)
    }
    if(comment === ''){
      return setShowEmptyPopup(true)
    }
    if(comment.length >= 500){
      return setShowLengthPopup(true)
    }
    postComment()
    window.location.replace(window.location.href);
  }
    
  const goLogin = () => {
    if(loginCheck === ''){//로그인체크여부
      return navigation('/login');
    }
  }

  const openReportPopup = () => {
    if(loginCheck === ''){
      return setShowLoginPopup(true);
    }
    setShowPostReportPopup(true);
  }

  const postReportHandler = () => {
    axios.put(`http://localhost:5500/api/v1/post/report/${getPostId[6]}`,{},{
      headers:{
        Authorization: `Bearer ${loginCheck}`
      }
    }).then((res) => {
      console.log('status', res.status);
      if(res.status === 200){
        console.log('신고에 성공하였습니다.');
      }
      setShowPostReportPopup(false);
    }).catch((err) => {
      console.log('err:::', err)
    })
  }
  
return(
    <div style={{padding: '0 162px'}}>
      <SectionTag style={{margin: '24px 0'}}>
        <BreadCrumb />
      </SectionTag>
      <BoardBg width="100%">
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
              purpose="reportPost"
              content="글 신고하기"
              disabled={false}
              onClick={openReportPopup}
            />
          </div>
      </SectionTag>
      <SectionTag padding="0 24px" margin=" 0 0 24px">
          <div style={buttonGroup}>
            <Input 
              value={comment}//state 들어갈것
              onChange={e => setComment(e)}
            />
            <div style={{width : '120px'}}>
              <Button
                purpose="base"
                content="등록"
                disabled={false}
                onClick={showPopupHandler}//로그인 x 면 로그인 팝업 아니면 댓글 500자 넘으면 등록하지 못하게 팝업
              />
            </div>
          </div>
      </SectionTag>
      <div style={commentGroup}>    
        <Comment 
          data={commentArr}
          localSaveUserId={tokenUserId}
        />
      </div>
      <Popup
        title='댓글 500자 이하로 작성해주세요.'
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setShowLengthPopup(false)}
        open={showLengthPopup}
      />
      <Popup
        title='댓글을 작성해주세요.'
        count={1}
        disabled={false}
        content='확인'
        firstBtn='base'
        secondBtn="reportComment"
        clickHandler={() => setShowEmptyPopup(false)}
        open={showEmptyPopup}
      />
      <Popup
        title='로그인이 필요한 서비스입니다.'
        count={2}
        disabled={false}
        content='로그인,취소하기'
        firstBtn="base"
        secondBtn="reportComment"
        clickHandler={goLogin}
        cancelEvent={() => setShowLoginPopup(false)}
        open={showLoginPopup}
        />
      <Popup
        title='정말 신고하시겠습니까?'
        count={2}
        disabled={false}
        content='신고하기,취소하기'
        firstBtn="base"
        secondBtn="reportComment"
        clickHandler={postReportHandler}
        cancelEvent={() => setShowPostReportPopup(false)}
        open={showPostReportPopup}
        />
    </div>
  )
}

export default Detail;


const detailWrap = {
  display:'flex',
  'flex-direction': 'column',
  alignItems: 'center',
  width: '1638px',
  margin: '0 auto'
}

const buttonGroup = {
  display : 'flex',
  alignItems : 'baseline',
  gap : '10px',
  padding : '0 18px'
}

const commentGroup = {
  margin: '0 0 54px',
  padding: '0 42px'
}