import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../animations/Checkmark.json';

import s from '../s.module.scss';

const SecondSectionClaimed = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={s.secondSectionClaimed}>
      <Lottie options={defaultOptions} height={144} width={144} />
      <p className={s.text}>You have already claimed your airdrop reward</p>
    </div>
  );
};

export default SecondSectionClaimed;
