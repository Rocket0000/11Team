import React from "react";
import Avatar from "@mui/material/Avatar";

interface ProfileImageProps {
  currentUser: {
    nickname: string;
    img: string;
  };
  purpose: "header" | "comment" | "mypage";
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const IMG_SIZE = {
  header: 60,
  comment: 36,
  mypage: 150,
};

const ProfileImage = ({ currentUser, onClick, purpose }: ProfileImageProps) => {
  const { nickname, img } = currentUser;

  const avatarStyle = {
    width: IMG_SIZE[purpose],
    height: IMG_SIZE[purpose],
    cursor: "pointer",
  };

  return <Avatar alt={nickname} src={img} sx={avatarStyle} onClick={onClick} />;
};

export default ProfileImage;
