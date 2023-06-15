import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TeamSelectContainer from "./TeamSelectContainer";
import { Team } from "../../pages/SchedulePage";
import ArrowButton from "../common/Button/ArrowButton";

interface TeamListProps {
  teamList: Team[];
  selectedTeam: number;
  onSelect: (id: number) => void;
  category: number;
}

const TeamList = ({
  teamList,
  selectedTeam,
  onSelect,
  category,
}: TeamListProps) => {
  const slickRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 1500,
    slidesToShow: teamList.length > 6 ? 6 : teamList.length + 1,
    slidesToScroll: teamList.length > 6 ? 6 : teamList.length + 1,
    prevArrow: (
      <Button onClick={() => slickRef.current?.slickPrev()}>
        <ArrowButton size="small" rotate={180} />
      </Button>
    ),
    nextArrow: (
      <Button onClick={() => slickRef.current?.slickNext()}>
        <ArrowButton size="small" rotate={0} />
      </Button>
    ),
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getImgSrc = (category: number) => {
    switch (category) {
      case 0:
        return "kleague";
      case 1:
        return "kbo";
      case 2:
        return "lck";
    }
  };

  return (
    <StyledSlider {...settings} ref={slickRef}>
      <TeamSelectContainer
        team={{
          id: 0,
          name: "전체",
          category: category,
          img: `/images/${getImgSrc(category)}.png`,
        }}
        isSelected={selectedTeam === 0}
        onSelect={onSelect}
      />
      {teamList.map((team) => (
        <TeamSelectContainer
          key={team.id}
          team={team}
          isSelected={team.id === selectedTeam}
          onSelect={onSelect}
        />
      ))}
    </StyledSlider>
  );
};

export default TeamList;

const StyledSlider = styled(Slider)`
  width: 100%;

  .slick-prev:before,
  .slick-next:before {
    content: "";
  }

  .slick-track {
    margin: 0;
  }

  .slick-slide {
    margin-right: 22px;
  }

  &::after {
    position: absolute;
    top: 0;
    width: 30px;
    height: 100%;
    content: "";
    background-image: linear-gradient(270deg, #fff, hsla(0, 0%, 100%, 0));
  }

  &::after {
    right: 0;
  }
`;

const Button = styled.button`
  position: absolute;

  &.slick-disabled {
    opacity: 0;
  }
`;
