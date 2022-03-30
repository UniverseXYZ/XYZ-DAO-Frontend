import React from 'react';

import Icon from 'components/custom/icon';

import s from '../s.module.scss';

const SecondSection = () => {
  return (
    <div className={s.secondSection}>
      <div>
        <button className="button-ghost">
          <span>WEEK 25/100</span>
        </button>
        <div className={s.label}>
          <span>Your total airdrop amount</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>The amount of forfeited $XYZ redistributed across remaining recipients.</div>
          </div>
        </div>
        <div className={s.value}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>130,000</span>
        </div>
        <div className={s.label}>
          <span>Total airdropped</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>The amount of forfeited $XYZ redistributed across remaining recipients.</div>
          </div>
        </div>
        <div className={`${s.value} ${s.small}`}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>120,000</span>
        </div>
        <div className={s.label}>
          <span>Your bonus amount</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>The amount of forfeited $XYZ redistributed across remaining recipients.</div>
          </div>
        </div>
        <div className={`${s.value} ${s.small} ${s.gradientColor}`}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>+10,000</span>
        </div>
      </div>
      <div>
        <Icon className={s.hideOnMobile} name="png/balloon-coin" width="100%" height="100%" />
        <Icon className={s.showOnMobile} name="png/balloon-coin-mobile" width="100%" height="100%" />
      </div>
    </div>
  );
};

export default SecondSection;
