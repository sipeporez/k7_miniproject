//signup
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { loginModalAtom } from "../LoginModalAtom";
import { useRecoilState } from "recoil";

const url = process.env.REACT_APP_API_URL;

const SignupPage = () => {
    // useState로 값을 변화시킴
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [idChecked, setIDChecked] = useState(false);
    const [modalState, setModalState] = useRecoilState(loginModalAtom);

    const idRef = useRef("");

    const MAX_LENGTH = 16;

    

    useEffect(() => {
        setIDChecked(false)
    }, [idRef.current.value])

    const handleDuplicate = async (e) => {
        e.preventDefault(); // 새로고침 방지

        const checkIDPayload = {
            userid: userId
        }

        if (!userId) {
            alert('ID를 입력하세요.')
            return;
        }

        await axios.post(
            `${url}signup/checkid`, checkIDPayload, {
            headers: { "Content-Type": "application/json", }
        })
            .then(resp => {
                if (resp.status === 200) {
                    setUserId(idRef.current.value);
                    alert("사용 가능한 ID 입니다.");
                    setIDChecked(true)
                }
            })
            .catch(error => {
                // Axios 오류 처리
                if (error.response && error.response.status === 409) {
                    // 중복된 ID일 때
                    alert("중복된 ID입니다.");
                    setIDChecked(false);
                } else {
                    // 다른 오류 처리
                    console.error('Error: ', error);
                    alert('중복 확인 중 오류가 발생했습니다.');
                }
            });

    };

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


    const handleSignup = async (e) => {
        e.preventDefault(); // 새로고침 막기

        if (!userId.trim()) {
            alert("아이디를 입력하세요.");
            return;
        }
        if (!password.trim()) {
            alert("비밀번호를 입력하세요.");
            return;
        }
        if (!confirmPassword.trim()) {
            alert("비밀번호 확인을 입력하세요.");
            return;
        }
        if (!nickname.trim()) {
            alert("닉네임을 입력하세요.");
            return;
        }

        // 회원가입 처리 로직 구현

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }
        if (!idChecked) {
            alert("ID 중복 체크를 해주세요.")
            return;
        }

        if (password.length > 16) {
            alert("비밀번호를 16자 이내로 입력해주세요.");
            return;
        } else if (password.length < 6) {
            alert("비밀번호를 6자 이상 입력해주세요.")
            return;
        }

        if (confirmPassword.length > 16) {
            alert("비밀번호를 16자 이내로 입력해주세요.");
            return;
        } else if (confirmPassword.length < 6) {
            alert("비밀번호를 6자 이상 입력해주세요.")
            return;
        }

        const payload = { // 서버로 보내는 데이터 묶음
            userid: userId,
            password: password,
            nickname: nickname
        };
        // 회원가입에 필요한 서버 통신 
        await axios.post(
            `${url}signup`, payload,
            {
                headers: { "Content-Type": "application/json", },
            }
        )
            .then(resp => {
                if (resp.status === 200) {
                    alert("회원가입이 완료되었습니다.")
                    setModalState({ ...modalState, content:'login' })
                } else {
                    alert('회원가입 실패');
                }
            }
            )
    }

    return (
        <div className="bg-white w-full h-full py-3">
            <div className="flex justify-center">
                <h2 className="text-3xl font-bold text-slate-700 sm:text-4xl">회원가입</h2>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="mt-10" action="#" onSubmit={handleSignup}>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="userId" className="text-sm font-semibold leading-6 text-slate-700">아이디</label>
                            <button type="button"
                                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 ml-4 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset"
                                onClick={handleDuplicate}>중복 확인
                            </button>
                        </div>
                    </div>
                    <div>
                        <input placeholder="아이디" className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
                            required=""
                            type="text"
                            id="userId"
                            value={userId}
                            ref={idRef}
                            onChange={(e) => setUserId(e.target.value)} //입력 필드의 값이 변경될때 바디 안의 함수를 호출한다(실시간으로 감지하고 처리)
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-semibold leading-6 text-slate-700" >비밀번호</label>
                        </div>
                        <div>
                            <input placeholder="••••••••" className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
                                required=""
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold leading-6 text-slate-700">비밀번호 확인</label>
                        </div>
                        <div>
                            <input placeholder="••••••••" className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
                                required=""
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} // e는 입력된 값인데 e.target.value로 현재 입력된 값을 뽑아와 useState를 통해 현재의 confirmPassword에 값을 변경한다
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="nickname" className="text-sm font-semibold leading-6 text-slate-700">닉네임</label>
                        </div>
                        <div>
                            <input placeholder="16자 이내로 입력하세요" className="w-full rounded-md border-2 px-2 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
                                required=""
                                maxLength={MAX_LENGTH}
                                type="text"
                                id="nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                        </div>
                        <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset 
            ring-gray-400 focus:ring-2 focus:ring-inset my-3"

                            type="button" onClick={handleRandomNickname}>랜덤 닉네임</button>
                    </div>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1 w-full"
                        id="signup-button" onClick={handleSignup}>
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;