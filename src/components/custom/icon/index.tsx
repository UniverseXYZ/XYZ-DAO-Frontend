import React, { CSSProperties } from 'react';
import cn from 'classnames';

import aaveSrc from 'resources/png/token-aave.png';
import ilvSrc from 'resources/png/token-ilv.png';
import linkSrc from 'resources/png/token-link.png';
import sushiSrc from 'resources/png/token-sushi.png';
import uslpSrc from 'resources/png/token-uslp.png';
import universeSrc from 'resources/png/universe.png';
import Sprite from 'resources/svg/icons-sprite.svg';

import s from './s.module.scss';

export type LogoIconNames = 'png/universe' | 'universe-text';

export type TokenIconNames =
  | 'bond-circle-token'
  | 'bond-square-token'
  | 'token-unknown'
  | 'static/token-bond'
  | 'static/token-uniswap'
  | 'static/tx-progress'
  | 'token-eth'
  | 'token-btc'
  | 'token-weth'
  | 'token-wbtc'
  | 'token-renbtc'
  | 'token-bond'
  | 'token-usdc'
  | 'token-dai'
  | 'token-susd'
  | 'token-uniswap'
  | 'token-usdt'
  | 'token-snx'
  | 'compound'
  | 'png/aave'
  | 'png/sushi'
  | 'png/link'
  | 'png/ilv'
  | 'png/uslp'
  | 'cream_finance'
  | 'yearn_finance';

export type NavIconNames =
  | 'paper-bill-outlined'
  | 'paper-alpha-outlined'
  | 'chats-outlined'
  | 'forum-outlined'
  | 'bar-charts-outlined'
  | 'savings-outlined'
  | 'proposal-outlined'
  | 'treasury-outlined'
  | 'bank-outlined'
  | 'tractor-outlined'
  | 'wallet-outlined'
  | 'docs-outlined';

export type ThemeIconNames = 'moon' | 'sun';

export type IconNames =
  | LogoIconNames
  | TokenIconNames
  | NavIconNames
  | ThemeIconNames
  | 'static/uStar'
  | 'right-arrow-circle-outlined'
  | 'arrow-back'
  | 'down-arrow-circle'
  | 'refresh'
  | 'notification'
  | 'chevron-right'
  | 'close-circle-outlined'
  | 'check-circle-outlined'
  | 'history-circle-outlined'
  | 'close'
  | 'close-tiny'
  | 'dropdown-arrow'
  | 'warning-outlined'
  | 'warning-circle-outlined'
  | 'gear'
  | 'node-status'
  | 'info-outlined'
  | 'network'
  | 'pencil-outlined'
  | 'rate-outlined'
  | 'plus-circle-outlined'
  | 'plus-square-outlined'
  | 'ribbon-outlined'
  | 'bin-outlined'
  | 'add-user'
  | 'search-outlined'
  | 'link-outlined'
  | 'arrow-top-right'
  | 'handshake-outlined'
  | 'stamp-outlined'
  | 'circle-plus-outlined'
  | 'circle-minus-outlined'
  | 'senior_tranche'
  | 'junior_tranche'
  | 'senior_tranche_simplified'
  | 'junior_tranche_simplified'
  | 'withdrawal_regular'
  | 'withdrawal_instant'
  | 'statistics'
  | 'filter'
  | 'tx-progress'
  | 'tx-success'
  | 'tx-failure'
  | 'burger'
  | 'burger-close'
  | 'hourglass'
  | 'history'
  | 'piggybank'
  | 'file'
  | 'add-file'
  | 'file-added'
  | 'file-deleted'
  | 'file-clock'
  | 'file-times'
  | 'wallet'
  | 'handshake'
  | 'padlock-unlock'
  | 'stopwatch'
  | 'judge'
  | 'certificate'
  | 'chart-up'
  | 'apy-up'
  | 'chart'
  | 'queue'
  | 'stake'
  | 'auction'
  | 'marketplace'
  | 'social-media'
  | 'about'
  | 'whitepaper'
  | 'team'
  | 'governance'
  | 'yield-farming'
  | 'docs'
  | 'twitter'
  | 'discord'
  | 'dropdown'
  | 'theme-switcher-sun'
  | 'theme-switcher-moon'
  | 'coingecko'
  | 'youtube'
  | 'medium'
  | 'polymorphs'
  | 'lobby-lobsters'
  | 'core-drops'
  | 'minting'
  | 'forum'
  | 'signal'
  | 'support'
  | 'rarity-chart'
  | 'static/add-token'
  | 'airdrop';

export type IconProps = {
  name: IconNames;
  width?: number | string;
  height?: number | string;
  color?: 'primary' | 'secondary' | 'red' | 'green' | 'blue' | 'inherit';
  rotate?: 0 | 90 | 180 | 270;
  className?: string;
  style?: CSSProperties;
  src?: string;
};

const Icon: React.FC<IconProps> = props => {
  const { name, width = 24, height = 24, rotate, color, className, style, src, ...rest } = props;

  const isStatic = (name ?? '').indexOf('static/') === 0;
  const isPng = (name ?? '').indexOf('png/') === 0;

  if (isPng) {
    const getSrc = () => {
      switch (name) {
        case 'png/universe':
          return universeSrc;
        case 'png/aave':
          return aaveSrc;
        case 'png/ilv':
          return ilvSrc;
        case 'png/link':
          return linkSrc;
        case 'png/sushi':
          return sushiSrc;
        case 'png/uslp':
          return uslpSrc;
        default:
          return '';
      }
    };
    return (
      <img
        className={cn(s.component, className, rotate && `rotate-${rotate}`, color && s[`${color}-color`])}
        width={width}
        alt=""
        height={height ?? width}
        style={style}
        src={src || getSrc()}
        {...rest}
      />
    );
  }

  return (
    <svg
      className={cn(s.component, className, rotate && `rotate-${rotate}`, color && s[`${color}-color`])}
      width={width}
      height={height ?? width}
      style={style}
      {...rest}>
      {!isStatic ? <use xlinkHref={`${Sprite}#icon__${name}`} /> : <use xlinkHref={`#icon__${name}`} />}
    </svg>
  );
};

export default Icon;
