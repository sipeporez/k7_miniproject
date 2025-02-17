import React, { useEffect, useState } from "react";
import RemovePopUp from "./RemovePopUp";

const url = process.env.REACT_APP_API_URL;

const UserProfile = () => {

    const [nickname, setNickname] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');
    const [removeConfirm, setRemoveConfirm] = useState(false);
    const [userNickname, setUserNickname] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {

            await fetch(url + "mypage/info", {
                headers: {
                    'Authorization': sessionStorage.getItem("token")
                }
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        return resp.json(); // 요청 성공하면 응답 데이터를 다음 then 체인의 data에 반환
                    } else {
                        return Promise.reject();
                    }
                })
                .then((data) => {
                    setNickname(data.nickname);
                })
                .catch(() => {
                    alert("정보를 불러오는데 실패했습니다.");
                })
        };
        fetchUserInfo();
    }, []); // 회원정보를 클릭하면 UserProfile이 마운트되고 처음 한번만 fetchUserInfo() 함수를 호출


    // 닉네임 변경 함수
    const handleNicknameChange = async (e) => {
        e.preventDefault();

        if (!nickname) { //공백입력시 
            alert('새 닉네임을 입력하세요.')
            return;
        }

        if (nickname.length > 16) {
            alert('닉네임 16자를 초과했습니다.')
            return;
        }

        await fetch(url + "mypage/changenick",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    nickname: nickname,
                }),
            }
        )
            .then((resp) => {
                if (resp.status === 200) {
                    alert('닉네임 변경이 완료되었습니다.');
                } else {
                    alert('닉네임 변경이 실패했습니다. 다시 시도해 주세요.')
                    return;
                }
            })


    };

    // 비밀번호 변경 함수
    const handlePasswordChange = async () => {
        if (!newPassword && !newConfirmPassword) { //공백입력시 
            alert('새 비밀번호를 입력하세요.')
            return;
        }

        if (newPassword.length > 16) {
            alert('비밀번호 16자 이내로 입력하세요.')
            return;
        } else if (newPassword.length < 6) {
            alert('비밀번호를 6자 이상 입력하세요.')
            return;
        }

        else if (newPassword !== newConfirmPassword) {
            alert('비밀번호를 확인해주세요.')
            return;
        }


        await fetch(url + "mypage/changepw",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    password: newPassword
                })
            }
        ).then((resp) => {
            if (resp.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.')
            } else {
                alert('비밀번호 변경에 실패했습니다.')
                return;
            }
        })
    }


    // 랜덤 닉네임 생성 함수
    const generateRandomNickname = async () => {
        // async: 비동기 함수이며, 항상 Promise를 반환한다.
        const resp = await fetch(url + "mypage/randomnick");
        // 함수내에서 await을 사용해서 비동기작업의 완료를 기다린다. fetch 요청에 성공하면 Promise는 Response를 반환하며 resp에 반환된 값이 저장됨
        // 비동기작업이 완료될때까지 코드를 일시 정지시키는 것
        return await resp.text(); // 텍스트로 변환될때까지 기다리고 반환

    }

    // 랜덤 닉네임을 인풋박스에 넣는 함수
    const handleRandomNickname = async () => {
        const randomNick = await generateRandomNickname(); // 현재 randomNick에 mypage/randomnick의 text를 저장
        setNickname(randomNick); // 닉네임에 저장하면 nickName에 출력된다
    }

    const handleRemoveAccount = async () => {
        await fetch(url + 'mypage/removeacc', {
            method: 'GET',
            headers: {
                'Authorization': sessionStorage.getItem("token")
                //세션저장소에서 token이라는 키로 저장된 값을 가져옴
            }
        })
            .then((resp) => { // 서버 요청 성공 후 응답
                if (resp.status === 200) { // 서버 요청 성공 후 응답이 되면,
                    window.location.href = "/";
                } 
            })
            .finally(() => {
                sessionStorage.removeItem("token"); // 현재 토큰 제거
            })
    };


    return (
        <div className="w-full h-auto flex items-center justify-center bg-white overflow-hidden">
            <div className="bg-white rounded w-full max-w-xl p-4">
                <form className="w-full" action="#">
                    <div className="mb-4 flex justify-between items-center gap-4">
                        <label className="text-xl font-semibold leading-6 text-slate-700">닉네임</label>
                        <div className="flex gap-4">
                            <button className="bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset"
                                type="button" onClick={handleRandomNickname}>랜덤 닉네임</button>
                            <button className="bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset"
                                type="button"
                                onClick={handleNicknameChange}>변경</button>
                        </div>
                    </div>
                    <input className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-2"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="새로운 닉네임 입력" />
                    <div>
                        <label className="text-xl font-semibold leading-6 text-slate-700">새 비밀번호</label>
                        <input className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-2"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="새 비밀번호" />
                        <br />
                        <label className="text-xl font-semibold leading-6 text-slate-700">새 비밀번호 확인</label>
                        <input className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-2"
                            type="password"
                            value={newConfirmPassword}
                            onChange={(e) => setNewConfirmPassword(e.target.value)}
                            placeholder="새 비밀번호 확인" />
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5">
                        <button
                            className="bg-red-600 hover:bg-red-300 text-white font-bold py-2 px-5 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset w-full"
                            type="button"
                            onClick={() => setRemoveConfirm(true)}
                        >
                            회원탈퇴
                        </button>
                        <button className="bg-slate-700 hover:bg-slate-400 text-white font-bold py-2 px-5 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset w-full"
                            type="button"
                            onClick={handlePasswordChange}>비밀번호 변경</button>
                    </div>

                    {removeConfirm && (
                        <RemovePopUp
                            onFlag={1}
                            onConfirm={handleRemoveAccount}
                            onCancel={() => setRemoveConfirm(false)}
                        />
                    )}
                </form>
            </div>
        </div>

    )
}
export default UserProfile;