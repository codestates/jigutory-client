import React, { Component } from 'react';
import { useState } from 'react';
import './styles/style.scss'
import { HashRouter, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Intro from './pages/Intro';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Cart from './pages/Cart';
import Store from './pages/Store';
axios.defaults.withCredentials = true;



function App() {
    // 모든 페이지, 컴포넌트에서 필요한 상태들
    const [userinfo, setUserinfo] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [level, setLevel] = useState('');
    const [badge, setBadge] = useState('');

    function handleLogin() {

    }

    function handleLogout() {

    }

    function handleUserInfo() {

    }



    return (
        <div>
            <header>
                <Nav />
            </header>
            <Switch>
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
