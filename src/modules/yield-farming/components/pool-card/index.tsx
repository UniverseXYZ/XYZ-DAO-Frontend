import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import { formatToken, formatUSD } from 'web3/utils';

import Grid from 'components/custom/grid';
import Icon, { IconNames } from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import { Hint, Text } from 'components/custom/typography';
import { XyzToken } from 'components/providers/known-tokens-provider';
import { YFPoolID, useYFPools } from 'modules/yield-farming/providers/pools-provider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

// import PoolStakeShareBar from '../pool-stake-share-bar';

export type PoolCardProps = {
  poolId: YFPoolID;
};

const PoolCard: React.FC<PoolCardProps> = props => {
  const { poolId } = props;

  const walletCtx = useWallet();
  const history = useHistory();
  const yfPoolsCtx = useYFPools();

  const poolMeta = yfPoolsCtx.getYFKnownPoolByName(poolId);
  const isEnded = poolMeta?.contract.isPoolEnded === true;

  const { totalEpochs, lastActiveEpoch, epochReward, potentialReward, poolEndDate = 0 } = poolMeta?.contract ?? {};

  const enabled = true;

  const formattedEndDate = format(
    addMinutes(fromUnixTime(poolEndDate), fromUnixTime(poolEndDate).getTimezoneOffset()),
    'MMM dd yyyy, HH:mm',
  );

  const poolBalanceInUSD = yfPoolsCtx.getPoolBalanceInUSD(poolId);
  const poolEffectiveBalanceInUSD = yfPoolsCtx.getPoolEffectiveBalanceInUSD(poolId);
  const myPoolBalanceInUSD = yfPoolsCtx.getMyPoolBalanceInUSD(poolId);
  const myPoolEffectiveBalanceInUSD = yfPoolsCtx.getMyPoolEffectiveBalanceInUSD(poolId);

  function handleStaking() {
    history.push(`/yield-farming/${poolId}`);
  }

  return (
    <div className="card">
      <div className={cn('card-header', s.cardTitleContainer)}>
        <IconsSet
          icons={poolMeta?.icons.map(icon => <Icon key={icon} name={icon as IconNames} width={40} height={40} />) ?? []}
        />
        <div className={s.cardTitleTexts}>
          <Text type="p1" weight="semibold" color="primary" ellipsis>
            {poolMeta?.label ?? '-'}
          </Text>
          <Text type="lb2" weight="semibold" color="primary" ellipsis>
            EPOCH {lastActiveEpoch ?? '-'} / {totalEpochs ?? '-'}
          </Text>
        </div>
        {walletCtx.isActive && (
          <button type="button" disabled={!enabled} onClick={handleStaking} className="button-primary">
            Staking
          </button>
        )}
      </div>
      {!isEnded && (
        <>
          <div className="card-row flex flow-row p-24">
            <Text type="lb2" weight="semibold" color="secondary" className="mb-4">
              Reward
            </Text>
            <div className="flex flow-col">
              <Text type="p1" weight="semibold" color="primary" className="mr-4">
                {formatToken(epochReward) ?? '-'}
              </Text>
              <Text type="p2" color="secondary">
                {XyzToken.symbol}
              </Text>
            </div>
          </div>
          {walletCtx.isActive && (
            <div className="card-row flex flow-row p-24">
              <Text type="lb2" weight="semibold" color="secondary">
                My Potential Reward
              </Text>
              <div className="flex flow-col">
                <Text type="p1" weight="semibold" color="primary" className="mr-4">
                  {formatToken(potentialReward) ?? '-'}
                </Text>
                <Text type="p2" color="secondary">
                  {XyzToken.symbol}
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
              {formatUSD(poolBalanceInUSD) ?? '-'}
            </Text>
            <Text type="p2" color="secondary" className="mb-8">
              {formatUSD(poolEffectiveBalanceInUSD) ?? '-'} effective balance
            </Text>
            {/*<PoolStakeShareBar shares={state.shares} />*/}
          </div>
        </>
      )}
      {walletCtx.isActive && (
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
            {formatUSD(myPoolBalanceInUSD)}
          </Text>
          {!isEnded && (
            <>
              <Text type="p2" color="secondary">
                {formatUSD(myPoolEffectiveBalanceInUSD)} effective balance
              </Text>
              {/*<PoolStakeShareBar shares={state.myShares} />*/}
            </>
          )}
        </div>
      )}
      {isEnded && (
        <div className={s.box}>
          <Grid className="card-row" flow="row" align="start">
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              The ${poolMeta?.label} staking pool ended after {totalEpochs} weeks on {formattedEndDate}. Deposits are
              now disabled, but you can still withdraw your tokens and collect any unclaimed rewards.
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
