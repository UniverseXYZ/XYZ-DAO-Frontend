import React, { useState } from 'react';

import FirstSection from './sections/FirstSection';
import SecondSection from './sections/SecondSection';
import SecondSectionClaimed from './sections/SecondSectionClaimed';
import SecondSectionConnectWallet from './sections/SecondSectionConnectWallet';
import SecondSectionNotEligible from './sections/SecondSectionNotEligible';
import ThirdSection from './sections/ThirdSection';
import ThirdSectionClaimed from './sections/ThirdSectionClaimed';
import ThirdSectionEmpty from './sections/ThirdSectionEmpty';

import s from './s.module.scss';

const AirdropView: React.FC = () => {
  const [state, setState] = useState('notEligible'); // initial, claimed, connectWallet, notEligible

  return (
    <div className={s.airdropRewardPage}>
      <div className={s.airdropRewardPageContainer}>
        <div className={s.titleDescription}>
          <h1 className={s.title}>Airdrop reward</h1>
          <p className={s.description}>
            You may have received claimable token rewards from the LeagueDAO Airdrop. Claiming your airdrop will forfeit
            a portion of your balance. Your total claimable amount will rise whenever someone forfeits a portion of
            their reward.
          </p>
        </div>
        <div className={s.gridLayout}>
          <FirstSection />
          {state === 'claimed' ? (
            <SecondSectionClaimed />
          ) : state === 'connectWallet' ? (
            <SecondSectionConnectWallet />
          ) : state === 'notEligible' ? (
            <SecondSectionNotEligible />
          ) : (
            <SecondSection />
          )}
          {state === 'claimed' ? (
            <ThirdSectionClaimed />
          ) : state === 'connectWallet' ? (
            <ThirdSectionEmpty />
          ) : state === 'notEligible' ? (
            <ThirdSectionEmpty />
          ) : (
            <ThirdSection />
          )}
        </div>
      </div>
    </div>
  );
};

export default AirdropView;
