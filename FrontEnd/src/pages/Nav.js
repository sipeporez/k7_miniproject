import React from 'react';
import { FaHome, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginModalAtom } from '../LoginModalAtom';
import LoginModal from './LoginModal';

export default function Nav() {
    const navigate = useNavigate();
    const [modalState, setModalState] = useRecoilState(loginModalAtom);

    const checkLogin = () => {
        if (sessionStorage.getItem("token") != null) {
            // 토큰값이 null이 아니면(로그인된 상태)
            setModalState({ ...modalState, isOpen: true, content: "mypage" })
        }else if (modalState.isOpen) {
            setModalState({ ...modalState, isOpen: false})
        }
        else {
            setModalState({ ...modalState, isOpen: true, content: "login" })
        }
    }
    return (
    <>
        <header className='w-10 sm:w-20 bg-slate-300 fixed z-10 h-full flex flex-col items-center justify-evenly'>
            <button
                onClick={() => navigate('/')}
                className='text-4xl space-x-2 transition-colors hover:text-white'>
                <FaHome />
            </button>
            <button
                onClick={() => checkLogin()}
                className='text-3xl space-x-2 transition-colors hover:text-white py-20 lg:py-40'>
                <FaUser />
            </button>
            <LoginModal/>
        </header >
        </>
    )
}
