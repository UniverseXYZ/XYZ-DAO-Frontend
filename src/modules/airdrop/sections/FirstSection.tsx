import React from 'react';

import Icon from 'components/custom/icon';

import s from '../s.module.scss';

const FirstSection = () => {
  return (
    <div className={s.firstSection}>
      <div>
        <div className={s.label}>
          <span>Total airdropped</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>
              This number shows the XYZ token rewards distributed so far out of the total of 2,800,000 that are going to
              be available for Yield Farming.
            </div>
          </div>
        </div>
        <div className={s.value}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>10,000,000</span>
        </div>
      </div>
      <div>
        <div className={s.label}>
          <span>Total claimed</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>The amount of XYZ claimed to date.</div>
          </div>
        </div>
        <div className={s.value}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>100,000</span>
        </div>
      </div>
      <div>
        <div className={s.label}>
          <span>Total redistributed</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>The amount of forfeited $XYZ redistributed across remaining recipients.</div>
          </div>
        </div>
        <div className={s.value}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>135,000</span>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
