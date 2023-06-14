import React from "react";
import Button,{ ButtonProps } from "./Button/Button";
import styled,{ css } from "styled-components";

interface PopupProps extends ButtonProps {
  title : string;
  count : 1 | 2 ;
  open: boolean;
  clickHandler : () => void;
  cancelEvent? : () => void; 
}

const Popup: React.FC<PopupProps> = ({title, count, disabled, purpose, content, clickHandler, cancelEvent, open}) => {

  const text = content.split(',');
  
  


return(
    <PopupBox isOpen={open}>
      <Bg>
        <StyledPopup>
          <h2>{title}</h2>
          <ButtonBox btnCount={count}>
            {
              count === 2 ?
              // <>
              //   <Button 
              //     disabled={disabled} 
              //     purpose='base' 
              //     content={text[0]}
              //     onClick={clickHandler}
              //   />
              //   <Button 
              //     disabled={disabled} 
              //     purpose="reportComment" 
              //     content={text[1]} 
              //     onClick={cancelEvent}
              //   />
              // </>
                          <>
                            <Button 
                              disabled={disabled} 
                              purpose={purpose} 
                              content={text[0]}
                              onClick={clickHandler}
                            />
                            <Button 
                              disabled={disabled} 
                              purpose={purpose} 
                              content={text[1]} 
                              onClick={cancelEvent}
                            />
                          </>
              :
              <Button 
                disabled={disabled} 
                purpose={purpose} 
                content={content} 
                onClick={clickHandler}
              />
            }
          </ButtonBox>
        </StyledPopup>
      </Bg>
    </PopupBox>

  );
};

export default Popup;

const PopupBox = styled.div<{isOpen: boolean}>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;

  width: 100vw;
  height: 100%;
  background: transparent;
`

const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background: rgba(85, 87, 112, 0.5);

  position: fixed;
  top: 0;
  left: 0;
`;

const StyledPopup = styled.div`
  width: 245px;
  padding: 20px;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 3.20559px 32.0559px rgba(0, 0, 0, 0.08);

  h2 {
    width: 224px;
    margin: 30px auto;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 18px;
    word-break: keep-all;
    text-align: center;
    white-space: pre-wrap;
  }
`;

const ButtonBox = styled.div<{ btnCount: 1 | 2 }>`
  display: flex;
  justify-content: ${(props) => (props.btnCount === 2 ? "flex-end" : "center")};
  align-items: center;
`;
