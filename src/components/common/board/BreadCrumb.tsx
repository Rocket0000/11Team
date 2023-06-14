import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import MiuLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';



const  BreadCrumb = () => {
  const src = window.location
  const getCategory = src.href.split('/').splice(0,4);

  let navigate = useNavigate();

  const goCategory = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    navigate(`/${getCategory[3]}`);
  }

  const goHome = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    navigate('/');
  }

  const breadcrumbs = [
    <MiuLink underline="hover" key="1" color="#A5ACBA" href="/" onClick={goHome}>
      홈
    </MiuLink>,
    <MiuLink
      underline="none"
      key="2"
      color="#A5ACBA"
      href={`/${getCategory[3]}`}
      onClick={goCategory}
    >
      {(() => {
        switch (getCategory[3]) {
          case "soccer":
            return '축구';
          case "baseball":
            return '야구';
          case "esport":
            return 'e-스포츠';
          default:
            return null;
        }
      })()}
    </MiuLink>,
    <Typography key="3" color="#5F30E2">
      게시판
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15" stroke="#2E3545" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
export default BreadCrumb;