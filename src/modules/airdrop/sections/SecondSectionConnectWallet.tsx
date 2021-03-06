import React from 'react';
import Lottie from 'react-lottie';

import { useWallet } from '../../../wallets/wallet';
import animationData from '../animations/Wallet.json';

import s from '../s.module.scss';

const SecondSectionConnectWallet = () => {
  const wallet = useWallet();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className={`${s.secondSectionClaimed} ${s.connectWallet}`}>
      <Lottie options={defaultOptions} height={144} width={144} />
      <p className={s.text}>To check if you are eligible for the airdrop, connect your wallet.</p>
      <button className="button-primary" onClick={() => wallet.showWalletsModal()}>
        Connect wallet
      </button>
    </div>
  );
};

export default SecondSectionConnectWallet;
