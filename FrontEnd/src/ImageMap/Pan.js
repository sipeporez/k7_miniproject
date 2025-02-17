import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import BoardList from '../Board/BoardList';
import DashBoard from '../nivo/DashBoard';
import Modal from '../pages/Modal';
import { snoSel } from '../SnoAtom';
import ImageMap from './Mapper';

const ZoomPanComponent = () => {
  const [sname, setSname] = useState('');
  const [scale, setScale] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const initialDistanceRef = useRef(0);
  const initialScaleRef = useRef(0);

  const panSpeed = 2; // 고정된 패닝 속도

  // 화면 크기에 따라 스케일값 변경
  const getScaleFromWidth = (width) => {
    const minWidth = 300;
    const maxWidth = 1900;
    const minScale = 0.15;
    const maxScale = 0.55;

    if (width < minWidth) return minScale;
    if (width > maxWidth) return maxScale;

    const scale = 0.00025 * width + 0.075;
    return scale;
  };

  // 스크린 사이즈 변경 시 스케일 값 업데이트
  useEffect(() => {
    const handleResize = () => {
      const newScale = getScaleFromWidth(window.innerWidth);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 컴포넌트 마운트 시 초기 스케일 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 줌 핸들러
  const handleZoom = useCallback((e) => {
    const zoomAmount = e.deltaY * -0.002;
    setScale((prevScale) => {
      const newScale = Math.min(Math.max(prevScale + zoomAmount, 0.15), 1);
      return newScale;
    });
  }, []);

  // 핀치 줌 핸들러 (터치)
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const distance = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      initialDistanceRef.current = distance;
      initialScaleRef.current = scale;
    } else if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [scale]);

  // 패닝 터치 핸들러
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
      const scaleChange = distance / initialDistanceRef.current;
      setScale(() => Math.min(Math.max(initialScaleRef.current * scaleChange, 0.2), 2));
    } else if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = (e.touches[0].clientX - lastPositionRef.current.x) * panSpeed * 3;
      const deltaY = (e.touches[0].clientY - lastPositionRef.current.y) * panSpeed * 3;

      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));

      lastPositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [scale]);

  // 패닝 터치 핸들러
  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) {
      isDraggingRef.current = false;
    }
  }, []);

  // 패닝 핸들러 (마우스)
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;

    const deltaX = (e.clientX - lastPositionRef.current.x) * panSpeed;
    const deltaY = (e.clientY - lastPositionRef.current.y) * panSpeed;

    setPosition((prevPosition) => ({
      x: prevPosition.x + deltaX,
      y: prevPosition.y + deltaY,
    }));

    lastPositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // 컴포넌트 마운트/언마운트 시 이벤트 리스너 추가/제거
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // 줌과 패닝 범위 조정
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const contentWidth = containerRect.width / scale;
    const contentHeight = containerRect.height / scale;

    setPosition((prevPosition) => {
      let newX = Math.max(Math.min(prevPosition.x, 0), containerRect.width - contentWidth);
      let newY = Math.max(Math.min(prevPosition.y, 0), containerRect.height - contentHeight);
      return { x: newX, y: newY };
    });
  }, [scale]);


  return (
    <>
      <Modal>
        <div className='flex-row xl:flex overflow-scroll w-full h-full'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
          <div className='w-full h-full xl:w-6/12'>
            <DashBoard setSname={setSname} />
          </div>
          <div className='flex w-full xl:w-6/12 justify-center mt-3'>
            <BoardList sno={useRecoilValue(snoSel)} sname={sname} />
          </div>
        </div>
      </Modal>
      <div
        ref={containerRef}
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          cursor: 'grab',
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'left top', // 'left top'으로 설정하여 줌 시 원점 고정
            width: '100%',
            height: '100%',
            position: 'absolute',
            transition: 'transform 0.25s ease-out', // 부드러운 줌 및 패닝 효과
          }}
        >
          <ImageMap />
        </div>
      </div>
    </>
  );
};

export default ZoomPanComponent;