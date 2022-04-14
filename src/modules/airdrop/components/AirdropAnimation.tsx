import Lottie from 'react-lottie';
import React from 'react';

import { ReactComponent as AirdropMask } from 'resources/svg/airdrop.svg';

import s from '../s.module.scss';
import animationData from '../animations/AirdropWaves.json';

interface IAirdropAnimationProps {
  percent: number;
}

export const AirdropAnimation = (props: IAirdropAnimationProps) => {
  const { percent } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={s.airdropAnimationWrapper}>
      <AirdropMask />
      <Lottie options={defaultOptions} style={{ bottom: `${percent}%` }} />
    </div>
  );
}
