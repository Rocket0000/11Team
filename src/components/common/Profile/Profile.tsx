import React, { useState } from "react";

import ProfilePopper from "./ProfilePopper";
import ProfileImage from "./ProfileImage";

interface ProfileProps {
  currentUser: {
    nickname: string;
    img: string;
  };
}

const Profile = ({ currentUser }: ProfileProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const id = isPopperOpen ? "profile-popper" : undefined;

  const onProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPopperOpen(true);
  };

  const onClose = () => {
    setIsPopperOpen(false);
  };

  return (
    <>
      <ProfileImage
        currentUser={currentUser}
        onClick={onProfileClick}
        purpose="header"
      />
      <ProfilePopper
        currentUser={currentUser}
        id={id}
        open={isPopperOpen}
        anchorEl={anchorEl}
        onClose={onClose}
      />
    </>
  );
};

export default Profile;
