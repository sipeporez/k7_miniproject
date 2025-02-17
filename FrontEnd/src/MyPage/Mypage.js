import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordPopUp from "./PasswordPopUp";
import { loginModalAtom } from "../LoginModalAtom";
import { useRecoilState } from "recoil";
import MyBoards from "./MyBoards";
import UserProfile from "./UserProfile";


const MyPage = () => {

    const [popUpOpen, setPopUpOpen] = useState(false);
    const [viewBoards, setViewBoards] = useState(false);
    const [viewUserProfile,setViewUserProfile] = useState(false);
    const [modalState, setModalState] = useRecoilState(loginModalAtom)

    const handleOpenPopUp = () => {
        if (viewUserProfile) return;
        setModalState({...modalState, duplicate: true});
        setViewBoards(false)
        setPopUpOpen(true);
    };

    const handleClosePopUp = () => {
        setModalState({...modalState, duplicate: false});
        setPopUpOpen(false);
    };

    //로그아웃 처리 함수
    const handleLogout = () => {
        sessionStorage.removeItem("token"); // 세션에 현재 토큰만 저장되어있기 때문에 토큰만 제거하면됨
        alert("로그아웃 되었습니다.");
        window.location.href = "/";  // "/"로 리디렉션하고 전체 새로고침
    }

    const handleViewMyBoards = () => {
        setViewUserProfile(false);
        setViewBoards(true);
    }

    return (
        <div className="w-full h-full flex flex-col bg-white overflow-hidden">
            <div className="items-center bg-white rounded">
                <header>
                    <h2 className="text-3xl  font-bold text-center text-slate-700">마이페이지</h2>
                </header>
                <form>
                    <div className="mb-4 flex gap-4">
                        <button onClick={handleLogout}
                            className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                            type="button"
                        >로그아웃
                        </button>
                        <button
                            onClick={handleOpenPopUp}
                            className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                            type="button"
                        >
                            회원정보
                        </button>
                        <button
                            onClick={handleViewMyBoards}
                            className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                            type="button"
                            >
                            
                            내가 쓴 게시글
                        </button>
                        {popUpOpen && <PasswordPopUp onClose={handleClosePopUp} onUserProfile={setViewUserProfile} />}
                        {/* 팝업이 켜져있을때 닫아야하니까 닫기 */}
                    </div>
                </form>
                {viewUserProfile && <UserProfile/>}
                {viewBoards && <MyBoards/>}
            </div>
        </div>
    )
}
export default MyPage;