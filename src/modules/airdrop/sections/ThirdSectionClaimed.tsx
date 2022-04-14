import React from 'react';

import Icon from 'components/custom/icon';

import s from '../s.module.scss';
import { AirdropAnimation } from '../components/AirdropAnimation';

const ThirdSectionClaimed = () => {
  return (
    <div className={s.thirdSection}>
      <div>
        <AirdropAnimation percent={30} />
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
