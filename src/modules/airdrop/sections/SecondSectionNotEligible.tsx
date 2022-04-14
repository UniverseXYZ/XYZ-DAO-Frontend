import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../animations/Lock.json';

import s from '../s.module.scss';

const SecondSectionNotEligible = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={`${s.secondSectionClaimed} ${s.notEligible}`}>
      <Lottie options={defaultOptions} height={144} width={144} />
      <p className={s.text}>Sorry, you are not eligible for this airdrop.</p>
    </div>
  );
};

export default SecondSectionNotEligible;
