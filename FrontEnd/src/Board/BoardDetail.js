import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardWrite from "./BoardWrite";

const url = process.env.REACT_APP_API_URL;

const BoardDetail = ({ board, onBack, sno, idx, myboard }) => {

    const navigate = useNavigate();

    const [editing, setEditing] = useState(false)
    const [boardData, setBoardData] = useState({}); // board 상태 변수를 정의하고 빈 객체로 선언, 가져온 게시판 데이터를 저장하기 위한 용도

    const getBoard = async () => { // 비동기함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        try {
            const resp = (await axios.get(`${url}board/view?idx=${idx}`));
            setBoardData(resp.data) // resp에 가져온 데이터를 board 상태변수에 저장
        } // axios를 통해 API를 호출하고 await으로 API 응답을 기다린다.     resp 응답변수에 data 속성을 저장한다
        catch (error) {
            alert("해당 게시물을 가져오는데 실패했습니다.")
            navigate('/');
        }
    }

    useEffect(() => {
        getBoard();
    }, [idx, sno])

    const handleUpdate = async () => {
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
                headers: { 'Authorization': sessionStorage.getItem("token") }
            });
            if (resp.status === 200) {
                setEditing(true)
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert('게시물 작성자가 아니므로 해당 게시물을 수정 할 수 없습니다.');
                return;
            }
        }
    };

    const handleDelete = async () => {
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', {
                headers: { 'Authorization': sessionStorage.getItem("token") }
            });
            if (resp.status === 200 && window.confirm('게시글을 삭제하시겠습니까?')) {
                const delResp = await axios.post(`${url}delete?idx=${idx}`, '', {
                    headers: { 'Authorization': sessionStorage.getItem("token") }
                });
                if (delResp.status === 200) {
                    alert('게시물이 삭제되었습니다.');
                    onBack();
                } else {
                    alert('알 수 없는 오류가 발생했습니다.');
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert('게시물 작성자가 아니므로 해당 게시물을 삭제할 수 없습니다.');
            }
        }
    };

    if (editing) {
        return (
            <BoardWrite
                board={boardData} // 수정할 게시물 데이터를 BoardWrite 컴포넌트로 전달
                backToList={onBack}
                editing={true} // 수정 모드로 호출
                idx={idx}
                myboard={myboard}
            />
        );
    }

    return (
        <div className="flex h-fit bg-white items-center justify-center overflow-hidden">
            <div className="w-full max-w-2xl bg-white rounded p-5">
                {myboard ? <></> : <header className="mb-5 flex justify-center">
                    <span className="text-4xl font-bold text-center text-slate-700">게시물 상세</span>
                </header>}
                    <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-3">
                        <div class="p-6">
                            <h1 class="text-2xl font-bold text-gray-900 mb-4">{board.title}</h1>
                            <div class="flex items-center mb-4">
                                <div class="text-gray-700 font-semibold">닉네임:</div>
                                <div class="ml-2 text-gray-600">{board.nickname}</div>
                            </div>
                            <p class="text-gray-800 mb-4">
                            {board.content}
                            </p>
                            <div class="text-gray-500 text-sm">
                                작성일자: {board.create_Date.replace('T', ' ').slice(0, 16)}
                            </div>
                        </div>
                    </div>
                <div className="flex gap-4">
                    <button
                        className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                        type="button"
                        onClick={handleUpdate}
                    >
                        수정
                    </button>
                    <button
                        className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                        type="button"
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                    <button
                        className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                        type="button"
                        onClick={onBack}
                    >
                        목록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;
