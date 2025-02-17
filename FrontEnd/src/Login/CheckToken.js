// checkToken.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import axios from 'axios';


const url = process.env.REACT_APP_API_URL;

const CheckToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const [firstLogin, setFirstLogin] = useState(false);


  const handlePasswordChange = async () => {
    if (!newPassword && !newConfirmPassword) { //공백입력시 
      alert('새 비밀번호를 입력하세요.')
      return;
    }
    if (newPassword.length > 16) {
      alert("비밀번호를 16자 이내로 입력해주세요.");
      return;
    } else if (newPassword.length < 6) {
      alert("비밀번호를 6자 이상 입력해주세요.")
      return;
    }

    if (newConfirmPassword.length > 16) {
      alert("비밀번호를 16자 이내로 입력해주세요.");
      return;
    } else if (newConfirmPassword.length < 6) {
      alert("비밀번호를 6자 이상 입력해주세요.")
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
        navigate('/login')
      } else {
        alert('비밀번호 변경에 실패했습니다.')
        return;
      }
    })
  }

  useEffect(() => {
    // URLSearchParams를 사용하여 쿼리 파라미터 추출
    const parseToken = new URLSearchParams(location.search);
    const token = "Bearer " + parseToken.get('token');

    if (token) {
      // JWT 토큰을 세션 스토리지에 저장
      sessionStorage.setItem('token', token);
      checkUser();
    } else {
      // 토큰이 없는 경우 로그인 페이지로 리다이렉트
      navigate("/login")
    }
  }, [location.search, navigate]);

  const checkUser = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json', // 요청 본문의 board 데이터를 json 타입으로 지정
          'Authorization': sessionStorage.getItem("token")
        }
      };
      const resp = await axios.post(`${url}login/checkOAuth`, '', config);
      if (resp.status === 202) {
        alert("첫 로그인이기 때문에 비밀번호 변경이 필요합니다.")
        window.history.pushState({}, '', '/changepw');
        setFirstLogin(true)
      }
    }
    catch (error) {
      if (error.response.status === 409) {
        alert("로그인 되었습니다.")
        navigate("/")
      }
    }
    finally {
      setLoading(false)
    }
  }

  if (firstLogin) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div>
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
          <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset my-1 w-full"
            id="signup-button" onClick={handlePasswordChange}>
            비밀번호 변경
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return <Loading />;
  }
};

export default CheckToken;