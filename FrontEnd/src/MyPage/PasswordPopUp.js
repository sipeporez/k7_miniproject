import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom"
import axios from "axios";
import { loginModalAtom } from '../LoginModalAtom';
import { useRecoilState } from "recoil";

const url = process.env.REACT_APP_API_URL;

const PasswordPopUp = ({ onClose, onUserProfile }) => {
    const [modalState, setModalState] = useRecoilState(loginModalAtom);
    const [password, setPassword] = useState("");
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalState({ ...modalState, duplicate: false });
            onClose();
        }
    };

    useEffect(() => {
        // 마운트 시 클릭 이벤트 리스너 추가
        document.addEventListener('mousedown', handleClickOutside);

        // 언마운트 시 클릭 이벤트 리스너 제거
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }
        await axios.post(url + "mypage/checkpw",
            { password },
            {
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": sessionStorage.getItem("token"),
                }
            }
        )
            .then((resp) => { // 서버 요청에 성공 후 응답(resp)
                if (resp.status === 200) { // 응답 성공 시 
                    onUserProfile(true); // navigate를 통해 userProfile(회원정보) 컴포넌트로 이동
                    onClose(); // 이후 팝업은 닫는다(사용자 정의함수)
                }
            }).catch(() => {
                alert("비밀번호가 일치하지 않습니다.");
            });
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">비밀번호 확인</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        className="border border-gray-300 p-2 w-full rounded-md mb-4"
                    />
                    <div className="flex space-x-10">
                        <button
                            type="submit"
                            className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                        >
                            확인
                        </button>
                        <button
                            onClick={onClose} // 닫기버튼 누르면 부모컴포넌트에서 선언해둔 onClose 함수 호출
                            type="button"
                            className="w-full bg-slate-500 hover:bg-slate-300 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                        >
                            닫기
                        </button>
                    </div>


                </form>

            </div>
        </div>,
        document.body
    )
}
export default PasswordPopUp;