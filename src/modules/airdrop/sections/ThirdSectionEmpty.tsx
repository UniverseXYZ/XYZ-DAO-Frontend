import React from 'react';

import s from '../s.module.scss';
import { AirdropAnimation } from '../components/AirdropAnimation';

const ThirdSectionEmpty = () => {
  return (
    <div className={s.thirdSection}>
      <AirdropAnimation percent={30} />
    </div>
  );
};

export default ThirdSectionEmpty;
