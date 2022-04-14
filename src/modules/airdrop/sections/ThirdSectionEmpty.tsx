import React from 'react';

import { AirdropAnimation } from '../components/AirdropAnimation';

import s from '../s.module.scss';

interface IThirdSectionEmpty {
  airdropProgress: number;
}

const ThirdSectionEmpty = ({ airdropProgress }: IThirdSectionEmpty) => {
  return (
    <div className={s.thirdSection}>
      <AirdropAnimation percent={airdropProgress} />
    </div>
  );
};

export default ThirdSectionEmpty;
