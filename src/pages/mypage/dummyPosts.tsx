interface Post {
  id: number;
  popular: boolean;
  title: string;
  content: string;
  createdAt: Date;
  author: string;
  views: number;
}

const dummyPosts: Post[] = [
  {
    id: 1,
    popular: true,
    title: "첫 번째 게시글",
    content: "첫 번째 게시글의 내용입니다.",
    createdAt: new Date("2023-06-01"),
    author: "신짱구",
    views: 100,
  },
  {
    id: 2,
    popular: false,
    title: "두 번째 게시글",
    content: "두 번째 게시글의 내용입니다.",
    createdAt: new Date("2023-06-02"),
    author: "김철수",
    views: 50,
  },
  {
    id: 3,
    popular: true,
    title: "세 번째 게시글",
    content: "세 번째 게시글의 내용입니다.",
    createdAt: new Date("2023-06-03"),
    author: "맹구",
    views: 80,
  },
];

export default dummyPosts;
