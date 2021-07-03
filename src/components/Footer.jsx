import React from 'react';
import github from '../images/github-logo.png';
import jigustory from '../images/jigu-logo.png';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <section>
        <div> <img className="jigutory-logo" src={jigustory} alt="jigutory-logo" /> </div>
        <div> Copyright &copy; 2021 Jigutory </div>
        <div className="footer-address-wrapper">
          {/* <i className="fas fa-map-pin pin-logo"></i> */}
          <i className="fas fa-map-marker-alt pin-logo"></i>
          <div className="footer-address">서울특별시 서초구 서초대로 396 20층 </div>
        </div>


      </section>
      <section>
        <h3> Jigu-Story </h3>
        <a href="http://github.com/codestates/jigutory-client/wiki" target="_blank">Jigutory Wiki</a>
        <a href="http://www.notion.so/jigu-tory-5ebc7e34b47442289d02c44f52d7a79a" target="_blank">Jigutory Notion </a>
      </section>

      <section className="footer-links">
        <h3><img className="github-logo" src={github} alt="move to github" /> Contact</h3>
        <a href="http://github.com/i2sign" target="_blank">정다희_backend@github</a>
        <a href="http://github.com/j21chon" target="_blank">김정호_backend@github</a>
        <a href="http://github.com/kang-heesue" target="_blank">강희수_frontend@github</a>
        <a href="http://github.com/Hyunsoosiesta" target="_blank">강현수_frontend@github</a>
      </section>
    </div>
  );
};

export default Footer;
