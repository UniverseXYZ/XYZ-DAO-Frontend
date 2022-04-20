import React from 'react';

import Icon from 'components/custom/icon';

import { formatAirdropPageNumbers } from '../../../utils';

import s from '../s.module.scss';

interface IFirstSection {
  totalAirdropped: number | undefined;
  claimableTokens: number | undefined;
  totalRedistributed: number | undefined;
}

const FirstSection = ({ totalAirdropped, claimableTokens, totalRedistributed }: IFirstSection) => {
  return (
    <div className={s.firstSection}>
      <div>
        <div className={s.label}>
          <span>Total airdropped</span>
          <div className={s.info}>
            <Icon name="info-outlined" width={16} height={16} />
            <div className={s.tooltip}>
              This number shows the total amount of XYZ tokens distributed as a whole,
              these tokens will all be available when the airdrop period is over.
            </div>
          </div>
        </div>
        <div className={s.value}>
          <Icon name="png/universe" width="auto" height="auto" />
          <span>{formatAirdropPageNumbers(totalAirdropped)}</span>
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
          <span>
            {totalAirdropped !== undefined &&
              claimableTokens !== undefined &&
              totalRedistributed !== undefined &&
              formatAirdropPageNumbers(totalAirdropped - claimableTokens - totalRedistributed)}
          </span>
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
          <span>{formatAirdropPageNumbers(totalRedistributed)}</span>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
