import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <p>
          본 콘텐츠의 저작권은 엘리스에 있으며, 이를 무단 이용하는 경우 저작권법
          등에 따라 법적 책임을 질 수 있습니다.
        </p>
        <CopyrightText>
          &copy; {new Date().getFullYear()}. FanHana. All Rights Reserved.
        </CopyrightText>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
  min-height: 80px;

  & p {
    margin-bottom: 10px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CopyrightText = styled.p`
  font-size: 14px;
  color: #666666;
`;
