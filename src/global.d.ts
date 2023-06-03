//TypeScript가 css파일을 모듈로 인식할 수 있도록 형식 선언
declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}
