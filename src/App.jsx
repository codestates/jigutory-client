import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import './styles/style.scss'
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Intro from './pages/Intro';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Cart from './pages/Cart';
import Store from './pages/Store';

function App() {
    const history = useHistory();

    // 모든 페이지, 컴포넌트에서 필요한 상태들
    const [userinfo, setUserinfo] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [level, setLevel] = useState('');
    const [badge, setBadge] = useState('');

    function handleAccessToken(token) {
        setAccessToken(token);
    }

    function handleLogin(token) {
        setIsLogin(true);
        handleAccessToken(token);
    }

    function handleLogout(token) {
        setIsLogin(false);
        localStorage.clear();
        history.push('/intro')
    }

    function handleUserInfo(obj) {
        setUserinfo(obj);
    }

    useEffect(() => {
        const dataFormLocalStorage = localStorage.getItem('is-Login')
        if (dataFormLocalStorage) {
            setIsLogin(JSON.parse(dataFormLocalStorage))
        }
    }, [setIsLogin])

    useEffect(() => {
        localStorage.setItem('is-Login', JSON.stringify(isLogin))
    }, [isLogin])


    function propstest() {
        console.log('전달 테스트')
    }

    return (
        <div>
            <header>
                <Nav />
            </header>
            <Switch>
                <Route path='/' exact={true} component={Intro} />
                <Route path='/signin' exact={true} render={() =>
                    (<SignIn propstest={propstest} handleLogin={handleLogin} accessToken={accessToken} />)} />
                <Route path='/intro' exact={true} component={Intro} />
                <Route path='/main' exact={true} component={Main} />
                <Route path='/mypage' exact={true} component={Mypage} />
                <Route path='/cart' exact={true} component={Cart} />
                <Route path='/store' exact={true} component={Store} />
            </Switch>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default withRouter(App);
