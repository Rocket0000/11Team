import React from "react";
import styled from "styled-components";
import Button from "./Button";
//import Button,{ ButtonProps } from "./Button";//버튼에 잇는 인터페이스 가져와야해서 export 필요함 *찬규님 확인*

interface PopupProps {
  title : string;
  count : 1 | 2 ;
}



const Popup: React.FC<PopupProps> = ({title, count}) => {


  return(
    <Bg>
      <StyledPopup>
        <h2>{title}</h2>
        <ButtonBox btnCount={count}>
          {
            count === 2 ? 
              <>
                <button></button>
                <button></button>
              </>
              :
              <button></button>
              //버튼 컴포넌트 받아와야함 지금 인터페이스를 받아올수 없어서 button태그로 대체함 이렇게 진행할 예정
          }
        </ButtonBox>
        {/*버튼 인터페이스 받아와야해서 작업 중지 */}
      </StyledPopup>
    </Bg>
  );
}

export default Popup;

const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100%;
  background: rgba(85, 87, 112, 0.5);
  
  position: fixed;
  top: 0;
  left: 0;
`;

const StyledPopup = styled.div`
  width: 345px;
  padding: 50px 0 14px;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 3.20559px 32.0559px rgba(0, 0, 0, 0.08);

  h2{
    width: 224px;
    margin: 30px;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 20px;
    word-break: keep-all;
  }
`;

const ButtonBox = styled.div<{ btnCount: 1 | 2 }>`
  display: flex;
  justify-content: ${ props => props.btnCount === 2 ? 'flex-end' : 'center'};
  align-items: center;
`;
