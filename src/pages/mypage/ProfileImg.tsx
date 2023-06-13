import React, { useState } from "react";

interface ProfileImage {
  id: number;
  thumbnailUrl: string;
  fullImageUrl: string;
  altText: string;
}

interface GalleryProps {
  onAvatarChange: (selectedImage: ProfileImage) => void;
}

const ProfileImg: React.FC<GalleryProps> = ({ onAvatarChange }) => {
  const thumbnailImages: ProfileImage[] = [
    {
      id: 1,
      thumbnailUrl: "/images/profile1.png",
      fullImageUrl: "/images/profile1.png",
      altText: "Image 1",
    },
    {
      id: 2,
      thumbnailUrl: "/images/profile2.png",
      fullImageUrl: "/images/profile2.png",
      altText: "Image 2",
    },
    {
      id: 3,
      thumbnailUrl: "/images/profile3.png",
      fullImageUrl: "/images/profile3.png",
      altText: "Image 3",
    },
    {
      id: 4,
      thumbnailUrl: "/images/profile4.png",
      fullImageUrl: "/images/profile4.png",
      altText: "Image 4",
    },
  ];

  const [selectedImage, setSelectedImage] = useState<ProfileImage | null>(
    thumbnailImages[0]
  );

  const handleThumbnailClick = (image: ProfileImage) => {
    setSelectedImage(image);
    onAvatarChange(image);
  };

  return (
    <div className="profileSelect">
      <div className="mainImage">
        <img
          src={
            selectedImage
              ? selectedImage.fullImageUrl
              : thumbnailImages[0].fullImageUrl
          }
          alt={
            selectedImage ? selectedImage.altText : thumbnailImages[0].altText
          }
        />
      </div>
      <div className="thumbnails">
        {thumbnailImages.map((image: ProfileImage) => (
          <img
            key={image.id}
            src={image.thumbnailUrl}
            alt={image.altText}
            style={{
              border: `2px solid ${
                selectedImage && selectedImage.id === image.id
                  ? "#5F30E2"
                  : "#fff"
              }`,
            }}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileImg;