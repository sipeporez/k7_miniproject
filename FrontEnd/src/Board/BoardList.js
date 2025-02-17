import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Paging from "../paging/Paging";
import BoardDetail from "./BoardDetail";
import BoardWrite from "./BoardWrite";

const url = process.env.REACT_APP_API_URL;

const BoardList = ({ sno, sname }) => {
    const [refresh, setRefresh] = useState(0);
    const [idx, setIdx] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [page, setPage] = useState({
        size: 5,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });
    const [writing, setWriting] = useState();
    const [selectedBoard, setSelectedBoard] = useState(); // 선택된 게시물 상태 추가
    const [searchMode, setSearchMode] = useState(false); // 검색 모드 상태 추가
    const inputRef = useRef();
    const selectRef = useRef();

    const getBoardList = async (pageNumber = 0) => {
        try {
            const resp = (await axios.get(`${url}board?sno=${sno}&page=${pageNumber}`)).data;
            setBoardList(resp.content);
            setPage({
                size: resp.page.size,
                number: resp.page.number,
                totalElements: resp.page.totalElements,
                totalPages: resp.page.totalPages,
            });
            setSearchMode(false); // 목록 조회 시 검색 모드 해제
        } catch (error) {
            console.error("게시물 목록을 가져오는데 실패했습니다.", error);
        }
    };

    const searchBoard = async (pageNumber = 0) => { // 검색 함수에 페이지 번호 추가
        let keyword = inputRef.current.value.trim();

        if (keyword.length < 2) {
            alert("2글자 이상 입력해주세요.");
            inputRef.current.focus();
            return;
        }
        try {
            const resp = await axios.get(`${url}board/search?searchType=${selectRef.current.value}&keyword=${keyword}&sno=${sno}`);
            const results = resp.data.content;
            setBoardList(results);
            setPage({
                size: resp.data.page.size,
                number: resp.data.page.number,
                totalElements: resp.data.page.totalElements,
                totalPages: resp.data.page.totalPages,
            });
            setSearchMode(true); // 검색 모드 활성화
        } catch (error) {
            console.error("게시판 자료를 가져오는데 실패했습니다.", error);
            alert("게시판 자료를 가져오는데 실패했습니다.");
        }
    };

    useEffect(() => {
        getBoardList();
    }, [sno]);

    useEffect(() => {
        if (refresh) {
            getBoardList();
        }
    }, [refresh]);

    const handleTitleClick = async (board) => {
        try {
            const resp = await axios.get(`${url}board/view?idx=${board.idx}`);
            setIdx(board.idx);
            setSelectedBoard(resp.data); // 선택된 게시물 상세 내용 상태 설정
        } catch (error) {
            console.error("게시물 상세 내용을 가져오는데 실패했습니다.", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        if (searchMode) {
            searchBoard(pageNumber - 1); // 검색 모드에서 검색 함수 호출
        } else {
            getBoardList(pageNumber - 1); // 일반 모드에서 게시물 목록 함수 호출
        }
    };

    const handleBack = () => {
        setSelectedBoard(null); // 상세 내용 상태 초기화
        setRefresh(refresh + 1);
    };

    const handleWriteClick = () => {
        setWriting(true); // 글쓰기 모드로 설정
    };

    const handleCancelWrite = () => {
        setWriting(false); // 글쓰기 모드 해제
    };

    const handleWriteSave = () => {
        setWriting(false); // 글쓰기 완료 후 글쓰기 모드 해제
        setRefresh(refresh + 1); // 게시판 리스트 새로고침
    };

    return (
        <div className='w-11/12'>
            {selectedBoard ? (
                <BoardDetail
                    board={selectedBoard}
                    onBack={handleBack}
                    sno={sno}
                    idx={idx}
                />
            ) : writing ? (
                <BoardWrite
                    backToList={handleCancelWrite}
                    onSave={handleWriteSave} />
            ) : (
                <div>
                    <div>
                        <h2 className="text-center text-4xl font-bold text-slate-700 mb-10">{sname}역 게시판</h2>
                    </div>
                    <div>
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <label>
                                <select ref={selectRef}
                                    className="bg-gray-50 border border-gray-300 text-slate-700 text-sm rounded-md focus:ring-blue-300 focus:border-blue-300 w-full p-2.5">
                                    <option value="title">제목</option>
                                    <option value="content">내용</option>
                                    <option value="nickname">닉네임</option>
                                </select>
                            </label>
                            <input className="w-1/2 rounded-md border-2 py-1.5 px-2 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500
                             focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                                type="text"
                                ref={inputRef}></input>
                            <button type="button" className="w-1/6 text-white bg-slate-700 hover:bg-slate-400 rounded-md text-sm py-2.5 text-center" onClick={handleBack}>목록</button>
                            <button type="button" className="w-1/6 text-white bg-slate-700 hover:bg-slate-400 rounded-md text-sm py-2.5 text-center" onClick={searchBoard}>검색</button>
                        </div>
                        {boardList.length === 0 ? (
                            <div className="flex justify-center">검색된 내용이 없습니다.</div>
                        ) : (
                            <div>
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100 flex text-center items-center">
                                            <th className="w-2/12 py-2">글 번호</th>
                                            <th className="w-5/12">제목</th>
                                            <th className="w-3/12">닉네임</th>
                                            <th className="w-2/12">등록일</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {boardList.map((board) => (
                                            <tr className="flex text-center odd:bg-white even:bg-gray-50 border-b py-1.5" key={board.idx}>
                                                <td className="font-medium text-slate-700 whitespace-nowrap w-2/12">{board.idx}</td>
                                                <td className="text-red-500 hover:text-blue-700 w-5/12 cursor-pointer" onClick={() => handleTitleClick(board)}>
                                                    {board.title}
                                                </td>
                                                <td className="w-3/12">{board.nickname}</td>
                                                <td className="w-2/12">{board.create_Date.replace('T', ' ').slice(0, 10)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <div className="w-full flex justify-center mt-3">
                            <Paging
                                activePage={page.number + 1}
                                itemsCountPerPage={page.size}
                                totalItemsCount={page.totalElements}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="text-white bg-slate-700 hover:bg-slate-400 focus:outline-none focus:ring-4 font-medium rounded-md text-sm px-4 py-2.5 text-center mb-5"
                            onClick={handleWriteClick}>게시물 등록</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardList;
