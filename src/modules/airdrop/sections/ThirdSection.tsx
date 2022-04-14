import React from 'react';

import Icon from 'components/custom/icon';

import s from '../s.module.scss';

const ThirdSection = () => {
  return (
    <div className={s.thirdSection}>
      <div>
        <Icon name="png/airdrop-claim" width="auto" height="auto" className={s.airdropClaimIcon} />
      </div>
      <div>
        <div className={s.availableToClaim}>
          <p>Available to claim now:</p>
          <div>
            <Icon name="png/universe" width="40" height="40" />
            <h3>1,138.67</h3>
          </div>
        </div>
        <div className={s.youForfeit}>
          <p>You forfeit:</p>
          <div>
            <Icon name="png/universe-red" width="30" height="30" />
            <h3>30,000.8790</h3>
          </div>
        </div>
        <div className={s.claimButton}>
          <button className="button-primary">Claim</button>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
