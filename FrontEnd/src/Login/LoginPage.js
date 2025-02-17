import React, { useState } from "react";
// React 라이브러리에서 React와 useState 훅을 가져오는 것
// useState: const[변경할 변수, 변경할값] = useState("");
//react-router-dom 라이브러리에서 Link, useNavigate 가져오는 것
import Loading from "../Loading";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginModalAtom } from "../LoginModalAtom";


const url = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const [inputUserId, setInputUserId] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loading, setLoading] = useState(false); // 로딩중 출력
  const [modalState, setModalState] = useRecoilState(loginModalAtom);

  let token = "";
  
  if (loading) {
    return <Loading />;
  }

  const handleGoogleLogin = () => {
    // 사용자를 Google OAuth2 인증 페이지로 리디렉션
    window.location.href = 'http://192.168.0.126.nip.io:8080/oauth2/authorization/google';
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!inputUserId.trim() || !inputPassword.trim()) {
      alert("아이디 혹은 비밀번호를 입력해주세요.")
      setLoading(false)
      return;
    }
    setLoading(true)

    await axios.post(  //axios는 응답을 json으로 자동변환해줌
      `${url}login`,
      { // 서버로 보낼 데이터
        userid: inputUserId,
        password: inputPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json', // 요청 본문이 JSON 타입임을 명시
        }
      }
    ).then(resp => {
      if (resp.status === 200) { // 200(성공)인지 응답 상태 확인
        token = resp.headers.get("Authorization")
        // sessionStorage: 브라우저 내장 객체로서, 데이터 저장소
        sessionStorage.setItem("token", token); // 토큰 저장 (세션 저장소에)
        sessionStorage.setItem("userid", inputUserId);
        // 토큰만 저장한 이유? 
        // sessionStorage에 필요한 최소한의 정보만 저장하는 것이 바람직하다. 토큰만 저장하면 데이터 관리 또한 간편해진다.
        alert("로그인되었습니다.")
        window.location.href = "/"; // 홈 페이지로 이동 및 페이지 새로 고침
      }
    }
    ).catch(() => {
      alert("아이디 혹은 비밀번호가 틀렸습니다.");
    })
      .finally(() => {
        console.log(token);
        setLoading(false) // 처리중 메시지 
        console.log(token);
      })
  }

  const handleSignup = () => {
    setModalState({ ...modalState, content: 'signup' }); // 회원가입 페이지로 이동
  };

  return (
    <div className="bg-white w-full h-full p-5">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">로그인</h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="mx-auto mt-16 max-w-xl sm:mt-20" action="#" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="text-sm font-semibold leading-6 text-gray-900">아이디</label>
            <div>
              <input className="w-full rounded-md border-2 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
                type="text"
                id="userId"
                value={inputUserId}
                autoComplete="current-username"
                onChange={(e) => setInputUserId(e.target.value)}
              // onChange: 입력하는동안 문자를 타이핑할때마다 onChange에서 정의한 파라미터의 e(이벤트)가 발생
              // 여기서 e.target.value는 현재 입력한 값으로, userId의 값을 현재 입력한 값으로 변경시킨다.
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold leading-6 text-gray-900">비밀번호</label>
            </div>
            <div>
              <input className="w-full rounded-md border-2 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1"
                type="password"
                id="password"
                value={inputPassword}
                autoComplete="current-password"
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 mb-6 rounded shadow-sm ring-1 ring-inset 
            ring-gray-400 focus:ring-2 focus:ring-inset my-3"
            type="submit"
          >
            로그인
          </button>
        </form>
        <footer className="flex text-sm text-slate-700 justify-center">
          <button
            className="text-slate-500 hover:text-slate-800"
            onClick={handleSignup} // 회원가입 버튼 클릭 시 회원가입 페이지로 이동
          >
            회원가입
          </button> {/* **수정됨** */}
        </footer>
        <button
          className="mt-4 w-full px-5 py-2 border border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 transition duration-150 shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset
           my-2"
          onClick={handleGoogleLogin}
        >
          <img className="w-6 h-6 inline-block" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
          <span className="ml-2">Google로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;