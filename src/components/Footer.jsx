import React from 'react';
import github from '../images/github-logo.png';
import jigustory from '../images/jigu-logo.png';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div>
        <div className="footer-header">JIGU-STORY</div>
        <a className="footer-info" href="http://github.com/codestates/jigutory-client/wiki" target="_blank">Jigutory Wiki</a>
        <a className="footer-info" href="http://www.notion.so/jigu-tory-5ebc7e34b47442289d02c44f52d7a79a" target="_blank">Jigutory Notion </a>
      </div>
      <div>
        <div className="footer-header footer-team">JIGU-TEAM<img id="github-logo" src={github} alt="move to github" /></div>
        <a className="footer-info" href="http://github.com/i2sign" target="_blank">정다희</a>
        <a className="footer-info" href="http://github.com/j21chon" target="_blank">김정호</a>
        <a className="footer-info" href="http://github.com/kang-heesue" target="_blank">강희수</a>
        <a className="footer-info" href="http://github.com/Hyunsoosiesta" target="_blank">강현수</a>
      </div>
      <div> Copyright &copy; 2021 Jigutory All rights reserved</div>
    </div>
  );
};

export default Footer;
