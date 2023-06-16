import React from "react";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ProfileImage from "./ProfileImage";

interface ProfilePopperProps {
  currentUser: {
    nickname: string;
    img: string;
  };
  open: boolean;
  anchorEl: HTMLElement | null;
  id: string | undefined;
  onClose: any; // 여기 계속 에러나서 any로 바꿈
}

const ProfilePopper = (props: ProfilePopperProps) => {
  const { currentUser, open, anchorEl, id, onClose } = props;
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      transition
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Fade {...TransitionProps} timeout={350}>
            <ProfilePopperContainer>
              <ProfilePopperHeader>
                <span>환영합니다!</span>
              </ProfilePopperHeader>
              <Divider />
              <ProfilePopperBody>
                <ProfileInfo>
                  <ProfileImage currentUser={currentUser} purpose="header" />
                  <TextContainer>
                    <UserNicknameText>
                      {currentUser.nickname}
                      <span>님</span>
                    </UserNicknameText>
                    <span>커뮤니티 방문을 환영합니다.</span>
                  </TextContainer>
                </ProfileInfo>
              </ProfilePopperBody>
              <Link to="/mypage/MyWrite" onClick={onClose}>
                <PopperButton variant="contained">마이 페이지</PopperButton>
              </Link>
            </ProfilePopperContainer>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default ProfilePopper;

const ProfilePopperContainer = styled.div`
  width: 340px;
  height: 240px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
  padding: 30px;
`;

const ProfilePopperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  span {
    font-size: 24px;
    font-weight: 500;
  }
`;

const ProfilePopperBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserNicknameText = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 7px;
  span {
    font-size: 14px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const PopperButton = styled(Button)`
  &&& {
    width: 100%;
    height: 36px;
    border-radius: 20px;
    background-color: #5546b7;
    cursor: pointer;
    font-size: 16px;
    color: #ffffff;
    margin-top: 30px;
    &:hover {
      background-color: #312694;
    }
  }
`;
