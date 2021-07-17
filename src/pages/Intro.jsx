import React, { useEffect } from 'react';
import AOS from 'aos';
import IntroMap from '../components/IntroMap';
import IntroEnding from '../components/IntroEnding';
import IntroMypage from '../components/IntroMypage';
import IntroStore from '../components/IntroStore';
import IntroHeader from '../components/IntroHeader';
import { ScrollButton } from '../components/ScrollButton';

function Intro() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  });

  return (
    <>
      <main className="intro-container">
        <IntroHeader />
        <IntroMap />
        <IntroMypage />
        <IntroStore />
        <IntroEnding />
        <ScrollButton />
      </main>
    </>
  );
}

export default Intro;
