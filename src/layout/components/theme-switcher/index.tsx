import React from 'react';
import { isMobile } from 'react-device-detect';

import Icon from 'components/custom/icon';
import { useGeneral } from 'components/providers/general-provider';

import s from './s.module.scss';

const ThemeSwitcher: React.FC = () => {
  const { toggleDarkTheme, isDarkTheme } = useGeneral();

  if (isMobile) {
    return null;
  }

  return (
    <button type="button" className={s.button} onClick={toggleDarkTheme}>
      <Icon name={isDarkTheme ? 'theme-switcher-sun' : 'theme-switcher-moon'} width={24} height={24} />
    </button>
  );
};

export default ThemeSwitcher;
