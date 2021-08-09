import React, { useEffect } from 'react';
import IntroHeader from '../components/IntroHeader';
import IntroMap from '../components/IntroMap';
import IntroEnding from '../components/IntroEnding';
import IntroMypage from '../components/IntroMypage';
import IntroStore from '../components/IntroStore';
import { ScrollButton } from '../components/ScrollButton';
import AOS from 'aos';

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
