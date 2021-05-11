import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import { useWeb3Contracts } from 'web3/contracts';
import { AAVETokenMeta } from 'web3/contracts/aave';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { COMPTokenMeta } from 'web3/contracts/comp';
import { ILVTokenMeta } from 'web3/contracts/ilv';
import { LINKTokenMeta } from 'web3/contracts/link';
import { SNXTokenMeta } from 'web3/contracts/snx';
import { SUSHITokenMeta } from 'web3/contracts/sushi';
import { formatBONDValue, formatBigValue, formatUSDValue } from 'web3/utils';

import Grid from 'components/custom/grid';
import IconsSet from 'components/custom/icons-set';
import { Hint, Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import { useWallet } from 'wallets/wallet';

import PoolStakeShareBar, { PoolTokenShare } from '../pool-stake-share-bar';

import { PoolTypes, getPoolIcons, getPoolNames } from '../../utils';

import s from './s.module.scss';

export type PoolCardProps = {
  pool: PoolTypes;
};

type State = {
  enabled?: boolean;
  isEnded?: boolean;
  endDate?: number;
  currentEpoch?: number;
  totalEpochs?: number;
  epochReward?: BigNumber;
  potentialReward?: BigNumber;
  balance?: BigNumber;
  myBalance?: BigNumber;
  effectiveBalance?: BigNumber;
  myEffectiveBalance?: BigNumber;
  shares?: PoolTokenShare[];
  myShares?: PoolTokenShare[];
};

const PoolCard: React.FC<PoolCardProps> = props => {
  const { pool } = props;

  const history = useHistory();
  const wallet = useWallet();
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<State>({});

  React.useEffect(() => {
    if (pool === PoolTypes.BOND) {
      setState({
        enabled: true,
        isEnded: web3c.yfBOND.isEnded,
        endDate: web3c.yfBOND.endDate,
        currentEpoch: web3c.yfBOND.currentEpoch,
        totalEpochs: web3c.yfBOND.totalEpochs,
        epochReward: web3c.yfBOND.epochReward,
        potentialReward: web3c.yfBOND.potentialReward,
        balance: web3c.aggregated.yfBONDStakedValue,
        myBalance: web3c.aggregated.myBONDStakedValue,
        effectiveBalance: web3c.aggregated.yfBONDEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myBondEffectiveStakedValue,
        shares: [
          {
            icon: BONDTokenMeta.icon,
            name: BONDTokenMeta.name,
            color: '#ff4339',
            value: formatBigValue(web3c.yfBOND.nextPoolSize, BONDTokenMeta.decimals),
            share:
              web3c.staking.bond.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfBOND.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: BONDTokenMeta.icon,
            name: BONDTokenMeta.name,
            color: '#ff4339',
            value: formatBigValue(web3c.yfBOND.nextEpochStake, BONDTokenMeta.decimals),
            share:
              web3c.staking.bond.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfBOND.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    } else if (pool === PoolTypes.AAVE) {
      setState({
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfLP.isEnded,
        endDate: web3c.yfLP.endDate,
        currentEpoch: web3c.yfLP.currentEpoch,
        totalEpochs: web3c.yfLP.totalEpochs,
        epochReward: web3c.yfLP.epochReward,
        potentialReward: web3c.yfLP.potentialReward,
        balance: web3c.aggregated.yfLPStakedValue,
        myBalance: web3c.aggregated.myLPStakedValue,
        effectiveBalance: web3c.aggregated.yfLPEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myLPEffectiveStakedValue,
        shares: [
          {
            icon: AAVETokenMeta.icon,
            name: AAVETokenMeta.name,
            color: '#2FB9C6',
            gradient: 'linear-gradient(90deg, #2FB9C6 0%, #B4519F 100%)',
            value: formatBigValue(web3c.yfLP.nextPoolSize, AAVETokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: AAVETokenMeta.icon,
            name: AAVETokenMeta.name,
            color: '#2FB9C6',
            gradient: 'linear-gradient(90deg, #2FB9C6 0%, #B4519F 100%)',
            value: formatBigValue(web3c.yfLP.nextEpochStake, AAVETokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    } else if (pool === PoolTypes.COMP) {
      setState({
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfLP.isEnded,
        endDate: web3c.yfLP.endDate,
        currentEpoch: web3c.yfLP.currentEpoch,
        totalEpochs: web3c.yfLP.totalEpochs,
        epochReward: web3c.yfLP.epochReward,
        potentialReward: web3c.yfLP.potentialReward,
        balance: web3c.aggregated.yfLPStakedValue,
        myBalance: web3c.aggregated.myLPStakedValue,
        effectiveBalance: web3c.aggregated.yfLPEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myLPEffectiveStakedValue,
        shares: [
          {
            icon: COMPTokenMeta.icon,
            name: COMPTokenMeta.name,
            color: '#00D395',
            value: formatBigValue(web3c.yfLP.nextPoolSize, COMPTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: COMPTokenMeta.icon,
            name: COMPTokenMeta.name,
            color: '#00D395',
            value: formatBigValue(web3c.yfLP.nextEpochStake, COMPTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    } else if (pool === PoolTypes.SNX) {
      setState({
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfLP.isEnded,
        endDate: web3c.yfLP.endDate,
        currentEpoch: web3c.yfLP.currentEpoch,
        totalEpochs: web3c.yfLP.totalEpochs,
        epochReward: web3c.yfLP.epochReward,
        potentialReward: web3c.yfLP.potentialReward,
        balance: web3c.aggregated.yfLPStakedValue,
        myBalance: web3c.aggregated.myLPStakedValue,
        effectiveBalance: web3c.aggregated.yfLPEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myLPEffectiveStakedValue,
        shares: [
          {
            icon: SNXTokenMeta.icon,
            name: SNXTokenMeta.name,
            color: '#0F0C20',
            value: formatBigValue(web3c.yfLP.nextPoolSize, SNXTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: SNXTokenMeta.icon,
            name: SNXTokenMeta.name,
            color: '#0F0C20',
            value: formatBigValue(web3c.yfLP.nextEpochStake, SNXTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    } else if (pool === PoolTypes.SUSHI) {
      setState({
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfLP.isEnded,
        endDate: web3c.yfLP.endDate,
        currentEpoch: web3c.yfLP.currentEpoch,
        totalEpochs: web3c.yfLP.totalEpochs,
        epochReward: web3c.yfLP.epochReward,
        potentialReward: web3c.yfLP.potentialReward,
        balance: web3c.aggregated.yfLPStakedValue,
        myBalance: web3c.aggregated.myLPStakedValue,
        effectiveBalance: web3c.aggregated.yfLPEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myLPEffectiveStakedValue,
        shares: [
          {
            icon: SUSHITokenMeta.icon,
            name: SUSHITokenMeta.name,
            color: '#2FADE4',
            gradient: 'background: linear-gradient(270deg, #2FADE4 0%, #F356A3 100%)',
            value: formatBigValue(web3c.yfLP.nextPoolSize, SUSHITokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: SUSHITokenMeta.icon,
            name: SUSHITokenMeta.name,
            color: '#0F0C20',
            gradient: 'background: linear-gradient(270deg, #2FADE4 0%, #F356A3 100%)',
            value: formatBigValue(web3c.yfLP.nextEpochStake, SUSHITokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    } else if (pool === PoolTypes.LINK) {
      setState({
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfLP.isEnded,
        endDate: web3c.yfLP.endDate,
        currentEpoch: web3c.yfLP.currentEpoch,
        totalEpochs: web3c.yfLP.totalEpochs,
        epochReward: web3c.yfLP.epochReward,
        potentialReward: web3c.yfLP.potentialReward,
        balance: web3c.aggregated.yfLPStakedValue,
        myBalance: web3c.aggregated.myLPStakedValue,
        effectiveBalance: web3c.aggregated.yfLPEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myLPEffectiveStakedValue,
        shares: [
          {
            icon: LINKTokenMeta.icon,
            name: LINKTokenMeta.name,
            color: '#2A5ADA',
            value: formatBigValue(web3c.yfLP.nextPoolSize, LINKTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: LINKTokenMeta.icon,
            name: LINKTokenMeta.name,
            color: '#2A5ADA',
            value: formatBigValue(web3c.yfLP.nextEpochStake, LINKTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    } else if (pool === PoolTypes.ILV) {
      setState({
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfLP.isEnded,
        endDate: web3c.yfLP.endDate,
        currentEpoch: web3c.yfLP.currentEpoch,
        totalEpochs: web3c.yfLP.totalEpochs,
        epochReward: web3c.yfLP.epochReward,
        potentialReward: web3c.yfLP.potentialReward,
        balance: web3c.aggregated.yfLPStakedValue,
        myBalance: web3c.aggregated.myLPStakedValue,
        effectiveBalance: web3c.aggregated.yfLPEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myLPEffectiveStakedValue,
        shares: [
          {
            icon: ILVTokenMeta.icon,
            name: ILVTokenMeta.name,
            color: '#242553',
            gradient: 'linear-gradient(90deg, #242553 0%, #5C2870 100%)',
            value: formatBigValue(web3c.yfLP.nextPoolSize, ILVTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: ILVTokenMeta.icon,
            name: ILVTokenMeta.name,
            color: '#242553',
            gradient: 'linear-gradient(90deg, #242553 0%, #5C2870 100%)',
            value: formatBigValue(web3c.yfLP.nextEpochStake, ILVTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    }
  }, [pool, web3c]);

  function handleStaking() {
    switch (pool) {
      case PoolTypes.AAVE:
        history.push('/yield-farming/aave');
        break;
      case PoolTypes.BOND:
        history.push('/yield-farming/bond');
        break;
      case PoolTypes.COMP:
        history.push('/yield-farming/comp');
        break;
      case PoolTypes.SNX:
        history.push('/yield-farming/snx');
        break;
      case PoolTypes.SUSHI:
        history.push('/yield-farming/sushi');
        break;
      case PoolTypes.LINK:
        history.push('/yield-farming/link');
        break;
      case PoolTypes.ILV:
        history.push('/yield-farming/ivl');
        break;
      case PoolTypes.USDC_kek_SUSHI_LP:
        history.push('/yield-farming/USDC_kek_SUSHI_LP');
        break;
      default:
    }
  }

  const endDateFormatted = React.useMemo(() => {
    if (!state.endDate) {
      return '-';
    }

    const dt = new Date(state.endDate);
    const fdt = format(addMinutes(dt, dt.getTimezoneOffset()), 'MMM dd yyyy, HH:mm');

    return `${fdt} UTC`;
  }, [state.endDate]);

  return (
    <div className="card">
      <div className={cn('card-header', s.cardTitleContainer)}>
        <IconsSet icons={getPoolIcons(pool)} />
        <div className={s.cardTitleTexts}>
          <Text type="p1" weight="semibold" color="primary" ellipsis title={getPoolNames(pool).join('/')}>
            {getPoolNames(pool).join('/')}
          </Text>
          <Text
            type="lb2"
            weight="semibold"
            color="primary"
            ellipsis
            title={`WEEK ${state.currentEpoch ?? '-'}/${state.totalEpochs ?? '-'}`}>
            WEEK {state.currentEpoch ?? '-'}/{state.totalEpochs ?? '-'}
          </Text>
        </div>
        {wallet.isActive && (
          <button type="button" disabled={!state.enabled} onClick={handleStaking} className="button-primary">
            Staking
          </button>
        )}
      </div>
      {!state.isEnded && (
        <>
          <div className="card-row flex flow-row p-24">
            <Text type="lb2" weight="semibold" color="secondary" className="mb-4">
              Reward
            </Text>
            <div className="flex flow-col">
              <Text type="p1" weight="semibold" color="primary" className="mr-4">
                {formatBONDValue(state.epochReward)}
              </Text>
              <Text type="p2" color="secondary">
                XYZ
              </Text>
            </div>
          </div>
          {wallet.isActive && (
            <div className="card-row flex flow-row p-24">
              <Text type="lb2" weight="semibold" color="secondary">
                My Potential Reward
              </Text>
              <div className="flex flow-col">
                <Text type="p1" weight="semibold" color="primary" className="mr-4">
                  {formatBONDValue(state.potentialReward)}
                </Text>
                <Text type="p2" color="secondary">
                  XYZ
                </Text>
              </div>
            </div>
          )}
          <div className="card-row flex flow-row p-24">
            <Hint
              className="mb-4"
              text={
                <span>
                  This number shows the total staked balance of the pool, and the effective balance of the pool.
                  <br />
                  <br />
                  When staking tokens during an epoch that is currently running, your effective deposit amount will be
                  proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked
                  balance and effective staked balance will be the equal, therefore pool balance and effective pool
                  balance will differ in most cases.
                </span>
              }>
              <Text type="lb2" weight="semibold" color="secondary">
                Pool Balance
              </Text>
            </Hint>

            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {formatUSDValue(state.balance)}
            </Text>
            <Text type="p2" color="secondary" className="mb-8">
              {formatUSDValue(state.effectiveBalance)} effective balance
            </Text>
            <PoolStakeShareBar shares={state.shares} />
          </div>
        </>
      )}
      {wallet.isActive && (
        <div className="card-row flex flow-row p-24">
          <Hint
            text={
              <span>
                This number shows your total staked balance in the pool, and your effective staked balance in the pool.
                <br />
                <br />
                When staking tokens during an epoch that is currently running, your effective deposit amount will be
                proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked
                balance and effective staked balance will be the equal, therefore your pool balance and your effective
                pool balance will differ in most cases.
              </span>
            }>
            <Text type="lb2" weight="semibold" color="secondary">
              My Pool Balance
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary">
            {formatUSDValue(state.myBalance)}
          </Text>
          {!state.isEnded && (
            <>
              <Text type="p2" color="secondary">
                {formatUSDValue(state.myEffectiveBalance)} effective balance
              </Text>
              <PoolStakeShareBar shares={state.myShares} />
            </>
          )}
        </div>
      )}
      {state.isEnded && (
        <div className={s.box}>
          <Grid className="card-row" flow="row" align="start">
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              {pool === PoolTypes.AAVE &&
                `The $AAVE staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $AAVE`}
              {pool === PoolTypes.BOND &&
                `The $BOND staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $BOND`}
              {pool === PoolTypes.COMP &&
                `The $COMP staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $COMP`}
              {pool === PoolTypes.SNX &&
                `The $SNX staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $SNX`}
              {pool === PoolTypes.SUSHI &&
                `The $SUSHI staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $SUSHI`}
              {pool === PoolTypes.LINK &&
                `The $LINK staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $LINK`}
              {pool === PoolTypes.ILV &&
                `The $ILV staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $ILV`}
              {pool === PoolTypes.USDC_kek_SUSHI_LP &&
                `The $USDC_kek_SUSHI_LP staking pool ended after ${state.totalEpochs} epochs on ${endDateFormatted}. Deposits are now
              disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to stake
              $USDC_kek_SUSHI_LP`}
            </Text>
            <Link to="/governance" className="link-gradient">
              <Text
                type="p2"
                weight="bold"
                color="var(--gradient-green-safe-color)"
                textGradient="var(--gradient-green)">
                Go to governance staking
              </Text>
            </Link>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default PoolCard;
