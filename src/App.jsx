import React, { useEffect, useState } from 'react';
import './styles/style.scss';
import {
    Route,
    Switch,
    Redirect,
    withRouter,
    useHistory,
} from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Store from './pages/Store';
import Cart from './pages/Cart';

function App() {
    const history = useHistory();

    // 모든 페이지, 컴포넌트에서 필요한 상태들
    const [userInfo, setUserInfo] = useState({
        usename: '',
        email: '',
        imgUrl: '',
    });
    const [isLogin, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [level, setLevel] = useState('');
    const [badge, setBadge] = useState('');

    // 로그인시 유저정보 상태저장 (콘솔창 확인)
    console.log('userinfo : ', userInfo)

    // 로그인 성공 => 로그인 상태 true & 유저정보 저장
    const handleLogin = (token) => {
        setAccessToken(token);
        if (token) {
            setIsLogin(true);
        }
    };

    const handleLogout = () => {
        setIsLogin(false);
        localStorage.clear();
        history.push('/intro');
    };

    const handleUserInfo = (obj) => {
        setUserInfo(obj);
    };

    // 새로고침 후 상태유지
    useEffect(() => {
        const dataFormLocalStorage = localStorage.getItem('is-Login');
        if (dataFormLocalStorage) {
            setIsLogin(JSON.parse(dataFormLocalStorage));
        }
    }, [setIsLogin]);

    useEffect(() => {
        localStorage.setItem('is-Login', JSON.stringify(isLogin));
    }, [isLogin]);

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
                <Route path="/" exact={true} component={Intro} />
                <Route path="/intro" exact={true} component={Intro} />
                <Route path="/main" exact={true} component={Main} />
                <Route path="/mypage" exact={true} component={Mypage} />
                <Route path="/cart" exact={true} component={Cart} />
                <Route path="/store" exact={true} component={Store} />
            </Switch>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default withRouter(App);
