import React, { useState, useEffect } from 'react';

const App = () => {
  // 상태 정의: 창의 너비와 높이를 저장
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 창 크기 변경 시 호출되는 함수
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  // 컴포넌트가 마운트될 때 이벤트 리스너를 등록하고,
  // 언마운트될 때 리스너를 제거
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 배열을 넣어 컴포넌트 마운트 시 한 번만 실행

  return (
    <div>
      <h1>창 크기</h1>
      <p>너비: {windowSize.width}px</p>
      <p>높이: {windowSize.height}px</p>
    </div>
  );
};

export default App;
