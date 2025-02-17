import React, { useEffect, useState } from "react";

// 회원탈퇴 버튼 클릭시 출력되는 회원탈퇴확인 팝업
const RemovePopUp = ({ onConfirm, onCancel, onFlag }) => {
    const [inputText, setInputText] = useState('');
    
    useEffect(() => { 
            alert("회원탈퇴시 작성한 게시물들은 모두 삭제됩니다.")
    }, []);

    const handleRemoveConfirm = () => {
        if (inputText === '회원탈퇴') {
            onConfirm();
            alert('회원탈퇴가 완료되었습니다.');
            sessionStorage.removeItem('token');
        } else {
            alert('"회원탈퇴"를 정확히 입력하세요.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">회원탈퇴 확인</h3>
                <p className="mb-4">회원탈퇴를 확정하려면 아래 텍스트를 입력하세요:</p>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="회원탈퇴"
                    className="border border-gray-300 p-2 rounded w-full mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                        onClick={handleRemoveConfirm}
                    >
                        확인
                    </button>
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        onClick={onCancel}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RemovePopUp;