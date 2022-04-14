import React from 'react';
import Lottie from 'react-lottie';

import { ReactComponent as AirdropMask } from 'resources/svg/airdrop.svg';

import animationData from '../animations/AirdropWaves.json';

import s from '../s.module.scss';

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
};
