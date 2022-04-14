import React from 'react';

import Icon from 'components/custom/icon';

import s from '../s.module.scss';

const ThirdSectionEmpty = () => {
  return (
    <div className={s.thirdSectionEmpty}>
      <Icon name="png/airdrop-claim" width="auto" height="auto" />
    </div>
  );
};

export default ThirdSectionEmpty;
