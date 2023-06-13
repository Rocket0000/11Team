import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

interface BreadCrumbProps{
  path: string;
  title: string;
  currentPage: string;
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function BreadCrumb() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="#A5ACBA" href="/" onClick={handleClick}>
      홈
    </Link>,
    <Link
      underline="none"
      key="2"
      color="#A5ACBA"
      href="/"//path 따와서 변경해야함
      onClick={handleClick}
    >
      카테고리이름 {/* 패스로 이름으로 변경해야함 */}
    </Link>,
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