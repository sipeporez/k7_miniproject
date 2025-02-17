import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import Paging from "../paging/Paging";
import BoardDetail from "../Board/BoardDetail";

const MyBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(0);
    const [page, setPage] = useState({
        size: 5,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });

    const [idx, setIdx] = useState(0);
    const [selectedBoard, setSelectedBoard] = useState(false); // 선택된 게시물 상태 추가

    // 딕셔너리 돌아서 역이름 가져오기
    const getStationName = (stationNo) => {
        return stations[stationNo];
    }

    const url = process.env.REACT_APP_API_URL;

    const handlePageChange = (pageNumber) => {
        fetchMyBoards(pageNumber - 1); // 페이지 번호는 1부터 시작하므로, 0부터 시작하는 페이지 인덱스에 맞추기 위해 -1
    };

    const fetchMyBoards = async (pageNumber = 0) => {
        try {
            const resp = await axios.get(`${url}mypage/boardlist`,
                {
                    headers: {
                        'Authorization': sessionStorage.getItem("token")
                    },
                    params: {
                        page: pageNumber,
                        size: page.size
                    }
                });

            if (resp.status === 200) {
                setBoards(resp.data.content);
                setPage({
                    size: resp.data.page.size,
                    number: resp.data.page.number,
                    totalElements: resp.data.page.totalElements,
                    totalPages: resp.data.page.totalPages,
                });
            }
        } catch (error) {
            alert("게시글을 가져오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBoards();
    }, [refresh]);

    useEffect(() => {
        fetchMyBoards();
    }, []);

    if (loading) {
        return <Loading />
    }

    const stations = {
        95: "다대포해수욕장",
        96: "다대포항",
        97: "낫개",
        98: "신장림",
        99: "장림",
        100: "동매",
        101: "신평",
        102: "하단",
        103: "당리",
        104: "사하",
        105: "괴정",
        106: "대티",
        107: "서대신",
        108: "동대신",
        109: "토성",
        110: "자갈치",
        111: "남포",
        112: "중앙",
        113: "부산역",
        114: "초량",
        115: "부산진",
        116: "좌천",
        117: "범일",
        118: "범내골",
        119: "서면",
        120: "부전",
        121: "양정",
        122: "시청",
        123: "연산",
        124: "교대",
        125: "동래",
        126: "명륜",
        127: "온천장",
        128: "부산대",
        129: "장전",
        130: "구서",
        131: "두실",
        132: "남산",
        133: "범어사",
        134: "노포",
        201: "장산",
        202: "중동",
        203: "해운대",
        204: "동백",
        205: "벡스코",
        206: "센텀시티",
        207: "민락",
        208: "수영",
        209: "광안",
        210: "금련산",
        211: "남천",
        212: "경성대부경대",
        213: "대연",
        214: "못골",
        215: "지게골",
        216: "문현",
        217: "국제금융센터부산은행",
        218: "전포",
        219: "서면",
        220: "부암",
        221: "가야",
        222: "동의대",
        223: "개금",
        224: "냉정",
        225: "주례",
        226: "감전",
        227: "사상",
        228: "덕포",
        229: "모덕",
        230: "모라",
        231: "구남",
        232: "구명",
        233: "덕천",
        234: "수정",
        235: "화명",
        236: "율리",
        237: "동원",
        238: "금곡",
        239: "호포",
        240: "증산",
        241: "부산대양산캠퍼스",
        242: "남양산",
        243: "양산",
        302: "망미",
        303: "배산",
        304: "물만골",
        305: "연산",
        306: "거제",
        307: "종합운동장",
        308: "사직",
        309: "미남",
        310: "만덕",
        311: "남산정",
        312: "숙등",
        313: "덕천",
        314: "구포",
        315: "강서구청",
        316: "체육공원",
        317: "대저",
        402: "동래",
        403: "수안",
        404: "낙민",
        405: "충렬사",
        406: "명장",
        407: "서동",
        408: "금사",
        409: "반여농산물시장",
        410: "석대",
        411: "영산대",
        412: "윗반송",
        413: "고촌",
        414: "안평"
    }

    const handleTitleClick = async (board) => {
        try {
            setIdx(board.idx);
            console.log(board.idx)
            const resp = await axios.get(`${url}board/view?idx=${board.idx}`);
            setSelectedBoard(resp.data); // 선택된 게시물 상세 내용 상태 설정
        } catch (error) {
            console.error("게시물 상세 내용을 가져오는데 실패했습니다.", error);
        }
    };

    const handleBack = () => {
        setSelectedBoard(null);
        setIdx(0);
        setRefresh(refresh + 1);
    };

    return (
        <div className="flex h-auto bg-white items-center justify-center overflow-hidden">
            <div className="w-full max-w-3xl bg-white rounded">
                {selectedBoard ? (
                    <BoardDetail
                        board={selectedBoard}
                        onBack={handleBack}
                        idx={idx}
                        myboard={true}
                    />
                ) : (
                    <>
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-gray-100 text-center">
                                    <th className="w-3/12 py-2">역명</th>
                                    <th className="w-1/12 py-2">글번호</th>
                                    <th className="w-5/12 py-2">제목</th>
                                    <th className="w-3/12 py-2">닉네임</th>
                                    <th className="w-2/12 py-2">작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boards.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-xl font-bold text-center text-slate-700 py-4">작성한 게시글이 없습니다.</td>
                                    </tr>
                                ) : (
                                    boards.map((board) => (
                                        <tr className="text-center odd:bg-white even:bg-gray-50 border-b" key={board.idx}>
                                            <td className="font-medium text-slate-700">
                                                {getStationName(board.station_no)}
                                            </td>
                                            <td className="font-medium text-slate-700 py-2">
                                                {board.idx}
                                            </td>
                                            <td className="text-red-500 hover:text-blue-700 cursor-pointer" onClick={() => handleTitleClick(board)}>
                                                {board.title}
                                            </td>
                                            <td>
                                                {board.nickname}
                                            </td>
                                            <td>
                                                {board.create_Date.replace('T', '/').slice(0, 10)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <div className="w-full flex justify-center mt-3">
                            <Paging
                                activePage={page.number + 1}
                                itemsCountPerPage={page.size}
                                totalItemsCount={page.totalElements}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );

}
export default MyBoards;