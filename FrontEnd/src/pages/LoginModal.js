import React from 'react';
import ReactDOM from 'react-dom';
import { useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginModalAtom } from '../LoginModalAtom'; // Recoil 상태 관리 파일을 임포트
import SignupPage from '../Login/SignupPage';
import LoginPage from '../Login/LoginPage';
import MyPage from '../MyPage/Mypage';

const LoginModal = () => {
  const [modalState, setModalState] = useRecoilState(loginModalAtom);
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target) && !modalState.duplicate) {
      setModalState({ ...modalState, isOpen: false }); // 모달 닫기
    }
  };

  useEffect(() => {
    // 마운트 시 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    
    // 언마운트 시 클릭 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalState]);

  if (!modalState.isOpen) return null;

  const getModalContent = () => {
    switch (modalState.content) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'mypage':
        return <MyPage />
    }
  };

  const modalStyle = modalState.content === 'mypage' ? myPageModalStyle : 'signup' ? signUpModalStyle : defaultModalStyle;

  return ReactDOM.createPortal(
    <div className='pl-10 sm:pl-20 w-full h-full bg-black bg-opacity-50 fixed flex justify-center items-center'>
      <div ref={modalRef} className={modalStyle} style={modalContentStyle}>
        {getModalContent()}
      </div>
    </div>,
    document.body // 모달을 body 태그에 렌더링합니다.
  );
};

const defaultModalStyle = 'h-auto shadow-lg'
const signUpModalStyle = 'w-2/5 p-5 h-auto shadow-lg'
const myPageModalStyle = 'w-4/5 h-4/5 flex'

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  position: 'relative',
};

export default LoginModal;
