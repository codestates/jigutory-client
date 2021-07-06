import React, { useEffect, useState } from 'react';
import './styles/style.scss';
import { Route, Switch, withRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Store from './pages/Store';
import Cart from './pages/Cart';
import EditUser from './pages/EditUser';

function App() {
  const [userInfo, setUserInfo] = useState({
    usename: '',
    email: '',
    imgUrl: '',
  });
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  // const [level, setLevel] = useState('');
  // const [badge, setBadge] = useState('');

  console.log('app.js 유저인포 상태 :', userInfo);
  console.log('app.js 상태 토큰 :', accessToken);
  console.log('app.js 상태 isLogin :', isLogin);

  const handleLogin = (token) => {
    setAccessToken(token);
    if (token) {
      setIsLogin(true);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    //setIsLogin(false);
  };

  const handleUserInfo = (obj) => {
    setUserInfo(obj);
  };

  useEffect(() => {
    const dataFormLocalStorage = localStorage.getItem('is-Login');
    if (dataFormLocalStorage) {
      setIsLogin(JSON.parse(dataFormLocalStorage));
    }
  }, [setIsLogin]);

  useEffect(() => {
    localStorage.setItem('is-Login', JSON.stringify(isLogin));
  }, [isLogin]);

  useEffect(() => {
    const dataFormLocalStorage = localStorage.getItem('accessToken');
    if (dataFormLocalStorage) {
      setAccessToken(dataFormLocalStorage);
    }
  }, [setAccessToken]);

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  useEffect(() => {
    const dataFormLocalStorage = localStorage.getItem('userInfo');
    if (dataFormLocalStorage) {
      setUserInfo(JSON.parse(dataFormLocalStorage));
    }
  }, [setUserInfo]);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <div>
      <header>
        <Nav
          isLogin={isLogin}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleUserInfo={handleUserInfo}
          accessToken={accessToken}
        />
      </header>

      <Switch>
        <>
          <div className="app-container">
            <Route path="/" exact={true} component={Intro} />
            <Route path="/intro" exact={true} component={Intro} />
            <Route path="/main" exact={true} component={Main} />
            <Route
              path="/mypage"
              exact={true}
              render={() => (
                <Mypage accessToken={accessToken} userInfo={userInfo} />
              )}
            />
            <Route
              path="/edituser"
              exact={true}
              render={() => (
                <EditUser
                  handleUserInfo={handleUserInfo}
                  accessToken={accessToken}
                  handleLogout={handleLogout}
                />
              )}
            />
            <Route path="/cart" exact={true} component={Cart} />
            <Route path="/store" exact={true} component={Store} />
          </div>
        </>
      </Switch>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default withRouter(App);
