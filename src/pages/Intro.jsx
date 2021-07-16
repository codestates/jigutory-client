import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { ScrollButton } from '../components/ScrollButton';
import IntroMap from '../components/IntroMap';
import IntroEnding from '../components/IntroEnding';
import IntroMypage from '../components/IntroMypage';
import IntroStore from '../components/IntroStore';
import axios from 'axios';

function Intro() {

  return (
    <>
      <main className="intro-container">
        <IntroMap />
        <IntroMypage />
        <IntroStore />
        <IntroEnding />
        <ScrollButton />
      </main>
    </>
  );
}

export default withRouter(Intro);
