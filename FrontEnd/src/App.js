import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import BoardDetail from './Board/BoardDetail';
import BoardList from './Board/BoardList';
import BoardWrite from './Board/BoardWrite';
import ZoomPanComponent from './ImageMap/Pan';
import LoginPage from './Login/LoginPage';
import SignupPage from './Login/SignupPage';
import MyBoards from './MyPage/MyBoards';
import MyPage from './MyPage/Mypage';
import UserProfile from './MyPage/UserProfile';
import CheckToken from './Login/CheckToken';
import Nav from './pages/Nav';
import { useEffect, useState } from 'react';
import LoadingOverlay from './Loading/LoadingOverlay';


function App() {
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const initialLoad = sessionStorage.getItem('appLoaded');
    if (initialLoad) {
      setLoading(false);
    } else {
      setLoading(true)
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        sessionStorage.setItem('appLoaded', 'true');
      };
      fetchData();
    }
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className='flex w-full'>
          <div>
          <Nav />
          </div>
          <LoadingOverlay isVisible={loading} />
          <div className='w-full h-full ml-20'>
          <main>
            <Routes>
              <Route path='/' element={<ZoomPanComponent />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/board' element={<BoardList />} />
              <Route path='/board/view' element={<BoardDetail />} />
              <Route path='/write' element={<BoardWrite />} />
              <Route path='/mypage/userProfile' element={<UserProfile />} />
              <Route path='/mypage/boardlist' element={<MyBoards />} />
              <Route path="/checkToken" element={<CheckToken />} />
            </Routes>
          </main>
          </div>
          </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;