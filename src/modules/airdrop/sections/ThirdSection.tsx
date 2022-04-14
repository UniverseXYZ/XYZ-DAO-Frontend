import React from 'react';

import Icon from 'components/custom/icon';

import { AirdropAnimation } from '../components/AirdropAnimation';

import { formatAirdropPageNumbers } from '../../../utils';

import s from '../s.module.scss';

interface IThirdSection {
  totalAidropAmount: number | undefined;
  adjustedAmount: number | undefined;
  bonusAmount: number | undefined;
  airdropProgress: number;
  showAirdropModal: Function;
}

const ThirdSection = ({
  totalAidropAmount,
  adjustedAmount,
  bonusAmount,
  airdropProgress,
  showAirdropModal,
}: IThirdSection) => {
  return (
    <div className={s.thirdSection}>
      <div>
        <AirdropAnimation percent={airdropProgress} />
      </div>
      <div>
        <div className={s.availableToClaim}>
          <p>Available to claim now:</p>
          <div>
            <Icon name="png/universe" width="40" height="40" />
            <h3>{formatAirdropPageNumbers(adjustedAmount)}</h3>
          </div>
        </div>
        <div className={s.youForfeit}>
          <p>You forfeit:</p>
          <div>
            <Icon name="png/universe-red" width="30" height="30" />
            <h3>
              {totalAidropAmount &&
                adjustedAmount &&
                bonusAmount &&
                formatAirdropPageNumbers(totalAidropAmount + bonusAmount - adjustedAmount)}
            </h3>
          </div>
        </div>
        <div className={s.claimButton} onClick={() => showAirdropModal(true)}>
          <button className="button-primary">Claim</button>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
