import React from 'react';
import { IntroMap } from '../components/IntroMap';
import { ScrollButton } from '../components/ScrollButton';

function Intro() {
  return (
    <>
      <section className="intro-container">
        <IntroMap />
        <ScrollButton />
      </section>
    </>
  );
}

export default Intro;
