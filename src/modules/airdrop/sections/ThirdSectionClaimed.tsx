import React from 'react';

import { AirdropAnimation } from '../components/AirdropAnimation';

import s from '../s.module.scss';

interface IThirdSectionClaimed {
  airdropProgress: number;
}

const ThirdSectionClaimed = ({ airdropProgress }: IThirdSectionClaimed) => {
  return (
    <div className={s.thirdSection}>
      <div>
        <AirdropAnimation percent={airdropProgress} />
      </div>
      <div>
        {/* <div className={s.availableToClaim}>
          <p>Amount claimed:</p>
          <div>
            <Icon name="png/universe" width="40" height="40" />
            <h3>1,138.67</h3>
          </div>
        </div> */}
        <div className={s.claimButton}>
          <button className="button-primary" disabled>
            Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdSectionClaimed;
