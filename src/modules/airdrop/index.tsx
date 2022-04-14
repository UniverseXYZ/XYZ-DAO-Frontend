import React, { useEffect, useState } from 'react';
import { add, differenceInCalendarWeeks } from 'date-fns';

import { useWallet } from '../../wallets/wallet';
import AirdropModal from '../yield-farming/components/pool-airdrop-modal';
import { useYFPools } from '../yield-farming/providers/pools-provider';
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
  const wallet = useWallet();
  const yfPoolsCtx = useYFPools();
  const [state, setState] = useState('initial'); // initial, claimed, connectWallet, notEligible

  const [airdropModalVisible, showAirdropModal] = useState(false);
  const merkleDistributorData = yfPoolsCtx.merkleDistributor;
  const adjustedAmount = merkleDistributorData?.adjustedAmount;
  const claimAmount = merkleDistributorData?.claimAmount;
  const isAirdropClaimed = merkleDistributorData?.isAirdropClaimed;
  const bonusAmount = merkleDistributorData?.bonusPart;
  const totalAirdropped = merkleDistributorData?.initialPoolSize;
  const claimableTokens = merkleDistributorData?.currentPoolSize;
  const claimIndex = merkleDistributorData?.claimIndex;
  const totalRedistributed = merkleDistributorData?.totalBonus;

  const airdropDurationInWeeks: number = 100;
  const airdropStartDate = new Date(1626674400000); // 2021-07-19 00:00:00
  const airdropEndDate = add(airdropStartDate, { weeks: airdropDurationInWeeks });
  const airdropCurrentWeek =
    airdropDurationInWeeks -
    differenceInCalendarWeeks(new Date(airdropEndDate), new Date() > airdropEndDate ? airdropEndDate : new Date());

  useEffect(() => {
    if (!wallet.isActive) {
      setState('connectWallet');
    } else if (isAirdropClaimed) {
      setState('claimed');
    } else if (claimIndex === -1) {
      setState('notEligible');
    } else {
      setState('initial');
    }
  }, [wallet, yfPoolsCtx]);

  return yfPoolsCtx.merkleDistributor?.isFetched || state === 'connectWallet' ? (
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
          <FirstSection
            totalAirdropped={totalAirdropped}
            claimableTokens={claimableTokens}
            totalRedistributed={totalRedistributed}
          />
          {state === 'claimed' ? (
            <SecondSectionClaimed />
          ) : state === 'connectWallet' ? (
            <SecondSectionConnectWallet />
          ) : state === 'notEligible' ? (
            <SecondSectionNotEligible />
          ) : (
            <SecondSection
              airdropCurrentWeek={airdropCurrentWeek}
              airdropDurationInWeeks={airdropDurationInWeeks}
              totalAirdropAmount={claimAmount}
              bonusAmount={bonusAmount}
            />
          )}
          {state === 'claimed' ? (
            <ThirdSectionClaimed />
          ) : state === 'connectWallet' ? (
            <ThirdSectionEmpty />
          ) : state === 'notEligible' ? (
            <ThirdSectionEmpty />
          ) : (
            <ThirdSection
              totalAidropAmount={claimAmount}
              adjustedAmount={adjustedAmount}
              bonusAmount={bonusAmount}
              showAirdropModal={showAirdropModal}
            />
          )}
        </div>
        {airdropModalVisible && (
          <AirdropModal merkleDistributor={merkleDistributorData} onCancel={() => showAirdropModal(false)} />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AirdropView;
