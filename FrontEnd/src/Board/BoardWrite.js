import React, { useEffect, useState } from "react";
import axios from "axios";
import { snoSel } from '../SnoAtom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

// 게시판 글쓰기
const BoardWrite = ({ onSave, backToList, editing, idx, myboard }) => {

    const sno = useRecoilValue(snoSel);
    const navigate = useNavigate();

    // board의 state를 빈 값으로 초기화
    const [board, setBoard] = useState(
        {
            title: '',
            content: '',
        }
    );

    const config = {
        headers: {
            'Content-Type': 'application/json', // 요청 본문의 board 데이터를 json 타입으로 지정
            'Authorization': sessionStorage.getItem("token")
        }
    };
    
    const { title, content } = board; // board의 props를 비어있는 값으로 초기화

    // 글쓰기 폼의 입력값이 변경될때 실행
    const onChange = (e) => {
        const { name, value } = e.target;
        setBoard(
            {
                ...board, // 해당 바디에서 정의한 속성(name)의 값(value)만 업데이트하고 board에 있는 기존의 속성은 유지해서 board를 수정
                [name]: value,
                // name의 value만 입력하도록 하는 함수
            }
        );
    };

    const checkUser = async () => {
        if (sessionStorage.getItem("token") == null) {
            window.location.href ="/";
            alert("로그인 후 이용 가능합니다.")
            return;
        }
        try {
            const resp = await axios.post(`${url}checkUser?idx=${idx}`, '', config);
            if (resp.status === 200) {
                getBoard();
                return 1;
            }
        }
        catch (error) {
            if (error.response.status === 401) {
                alert('게시글 작성자가 아니므로 해당 게시글을 수정할 수 없습니다.');
                navigate("/")
                return 0;
            }
        }
    }

    const checkToken = () => {
        if (checkUser() === 0) {
            alert("해당 게시글을 수정할 권한이 없습니다.")
        }
    }
    useEffect(() => {
        checkToken();
    },[])

    const getBoard = async () => { // 비동기 함수 getBoard를 선언, 데이터를 비동기적으로 가져오기 위해 async로 선언
        try {
            const resp = await axios.get(`${url}board/view?idx=${idx}`);
            setBoard(resp.data); // resp에 가져온 데이터를 board 상태변수에 저장
        } catch (error) {
            alert("게시판 자료를 가져오는데 실패했습니다.");
            return;
        }
    };

    // 게시글 수정
    const editBoard = async () => {
        try {
            const resp = await axios.post(`${url}edit?idx=${idx}`, JSON.stringify(board), config);
            if (resp.status === 200) {
                alert('게시물이 수정되었습니다.');
                backToList()
            }
        } catch (error) {
            if (error.response.status === 401) { // 수정: error.response로 변경
                alert('게시글 작성자가 아니므로 해당 게시물을 수정할 수 없습니다.');
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }
            return;
        }
    };

    // 글쓰기 저장 함수
    const saveBoard = async () => {
        if (title.trim() === '' || content.trim() === '') {
            alert('제목과 내용은 빈 칸일 수 없습니다.');
            return;
        }
        try {
            await axios.post(`${url}write?sno=${sno}`, JSON.stringify(board), config);
            // 글쓰기를 하려면 역번호, JSON 변환된 board 객체, token 값이 넘어가도록 axios.post 지정

            // 서버에 요청 성공하면 alert을 띄우고 페이지 이동
            alert('등록되었습니다.');
            onSave();
        } catch (error) {
            console.error('Error:', error);
            alert('등록에 실패하였습니다.');
        }
        // 서버에 board 객체를 전송(요청)하고, 화면에 응답으로 alert 출력 후, navigate 함수를 통해서 board 페이지로 이동
        // 정리: 서버에 요청(req) 성공시 then체인으로 응답(res)
    };

    return (
        <div className="flex h-full bg-white items-center justify-center overflow-hidden">
            <div className="w-full bg-white rounded px-5">
                <header>
                    {myboard ? <></> : <h2 className="text-4xl font-bold text-center text-slate-700"> {editing ? "게시물 수정" : "게시물 등록"}</h2>}
                </header>
                <form>
                    <div className="mb-4">
                        <label className="mb-2 text-slate-700" htmlFor="title">제목</label>
                        <input
                            className="w-full rounded-md border-2 py-1.5 px-2 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 text-slate-700" htmlFor="content">내용</label>
                        <textarea
                            className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset"
                            id="content"
                            name="content"
                            cols="30"
                            rows={myboard? 5:10}
                            value={content}
                            onChange={onChange}
                        ></textarea>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"
                            type="button"
                            onClick={editing ? editBoard : saveBoard}
                        >
                            {editing ? "수정" : "저장"}
                        </button>
                        <button
                        className="w-full bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-3"    
                            type="button"
                            onClick={backToList}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )


}
export default BoardWrite;