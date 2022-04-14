import React from 'react';

import Icon from 'components/custom/icon';

import { formatAirdropPageNumbers } from '../../../utils';

import s from '../s.module.scss';

interface ISecondSection {
  airdropCurrentWeek: number;
  airdropDurationInWeeks: number;
  totalAirdropAmount: number | undefined;
  bonusAmount: number | undefined;
}

const SecondSection = ({
  airdropCurrentWeek,
  airdropDurationInWeeks,
  totalAirdropAmount,
  bonusAmount,
}: ISecondSection) => {
  return (
    <div className={s.secondSection}>
      <div>
        <button className="button-ghost">
          <span>
            WEEK {airdropCurrentWeek}/{airdropDurationInWeeks}
          </span>
        </button>
        <div className={s.label}>
          <span>Your total airdrop amount</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>
              This is the total amount of XYZ you are getting based on your initial airdrop amount + bonus amount from
              redistributes XYZ.
            </div>
          </div>
        </div>
        <div className={s.value}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>
            {totalAirdropAmount !== undefined &&
              bonusAmount !== undefined &&
              formatAirdropPageNumbers(totalAirdropAmount + bonusAmount)}
          </span>
        </div>
        <div className={s.label}>
          <span>Total airdropped</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>The amount of XYZ token airdrop assigned to you.</div>
          </div>
        </div>
        <div className={`${s.value} ${s.small}`}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>{formatAirdropPageNumbers(totalAirdropAmount)}</span>
        </div>
        <div className={s.label}>
          <span>Your bonus amount</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>
              This is the amount of additional XYZ you have received as a result of early claimants forfeiting a portion
              of their airdrop.
            </div>
          </div>
        </div>
        <div className={`${s.value} ${s.small} ${s.gradientColor}`}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>+{formatAirdropPageNumbers(bonusAmount)}</span>
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
