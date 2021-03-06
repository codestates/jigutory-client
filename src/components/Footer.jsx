import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div>
        <div className="footer-header footer-story">JIGU-STORY<i className="fas fa-globe-asia"></i></div>
        <a
          className="footer-info"
          href="http://github.com/codestates/jigutory-client/wiki"
          target="_blank"
          rel="noreferrer"
        >
          Jigutory Wiki
        </a>
        <a
          className="footer-info"
          href="http://www.notion.so/jigu-tory-5ebc7e34b47442289d02c44f52d7a79a"
          target="_blank"
          rel="noreferrer"
        >
          Jigutory Notion
        </a>
      </div>

      <div>
        <div className="footer-header footer-team">JIGU-TEAM<i className="fab fa-github"></i></div>
        <a
          className="footer-info"
          href="http://github.com/Hyunsoosiesta"
          target="_blank"
          rel="noreferrer"
        >
          강현수
        </a>
        <a
          className="footer-info"
          href="http://github.com/kang-heesue"
          target="_blank"
          rel="noreferrer"
        >
          강희수
        </a>
        <a
          className="footer-info"
          href="http://github.com/j21chon"
          target="_blank"
          rel="noreferrer"
        >
          김정호
        </a>
        <a
          className="footer-info"
          href="http://github.com/i2sign"
          target="_blank"
          rel="noreferrer"
        >
          정다희
        </a>
      </div>
      <div className="footer-container-copyright">
        Copyright &copy; 2021 Jigutory All rights reserved
      </div>
    </div>
  );
};

export default Footer;
