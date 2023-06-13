//TypeScript가 SVG파일을 컴포넌트(모듈)로 인식 할 수 있도록 형식 선언
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}