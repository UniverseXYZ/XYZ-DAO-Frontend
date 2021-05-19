import React from 'react';
import cn from 'classnames';
import { formatToken, formatUSD } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { XyzToken } from 'components/providers/known-tokens-provider';
import { XYZ_MARKET_LINK } from 'config';
import { UseLeftTime } from 'hooks/useLeftTime';

import { useYFPool } from '../../providers/pool-provider';
import { useYFPools } from '../../providers/pools-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

type Props = {
  className?: string;
};

const PoolStats: React.FC<Props> = ({ className }) => {
  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYFPool();
  const { poolMeta } = yfPoolCtx;

  const yfTotalStakedInUSD = yfPoolsCtx.getYFTotalStakedInUSD();
  const yfTotalEffectiveStakedInUSD = yfPoolsCtx.getYFTotalEffectiveStakedInUSD();
  const yfTotalSupply = yfPoolsCtx.getYFTotalSupply();
  const yfDistributedRewards = yfPoolsCtx.getYFDistributedRewards();
  const [, epochEndDate] = yfPoolsCtx.stakingContract?.epochDates ?? [];

  const isEnded = poolMeta?.contract.isPoolEnded === true;

  return (
    <div className={cn(s.component, className)}>
      <div className="card p-24">
        <Grid flow="row" className={s.item}>
          <Grid flow="col" align="center" justify="space-between">
            <Hint
              text={
                <Text type="p2">
                  This number shows the Total Value Locked across the staking pool(s). It is the USD and ETH conversion
                  of the amounts in the pool balance(s).
                </Text>
              }>
              <Text type="lb2" weight="semibold" color="primary" className={s.label}>
                Total Value Locked
              </Text>
            </Hint>
          </Grid>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatUSD(yfTotalStakedInUSD, {
                decimals: 0,
              }) ?? '-'}
            </Text>
            <Text type="p1" color="secondary">
              {formatUSD(yfTotalEffectiveStakedInUSD, {
                decimals: 0,
              }) ?? '-'}{' '}
              eff. locked
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" className={s.item}>
          <Grid flow="col" align="center" justify="space-between">
            <Hint
              text={
                <Text type="p2">
                  This number shows the ${XyzToken.symbol} token rewards distributed so far out of the total of{' '}
                  {formatToken(yfTotalSupply) ?? '-'} that are going to be available for Yield Farming.
                </Text>
              }>
              <Text type="lb2" weight="semibold" color="primary" className={s.label}>
                {XyzToken.symbol} Rewards
              </Text>
            </Hint>
          </Grid>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatToken(yfDistributedRewards) ?? '-'}
            </Text>
            <Text type="p1" color="secondary">
              out of {formatToken(yfTotalSupply) ?? '-'}
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" className={s.item}>
          <Grid flow="col" align="center" justify="space-between">
            <Text type="lb2" weight="semibold" color="primary" className={s.label}>
              {XyzToken.symbol} Price
            </Text>
          </Grid>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatUSD(XyzToken.price) ?? '-'}
            </Text>
            <ExternalLink href={XYZ_MARKET_LINK} className="link-gradient">
              <Text type="p1" weight="semibold" color="var(--gradient-blue-safe)" textGradient="var(--gradient-blue)">
                SushiSwap market
              </Text>
            </ExternalLink>
          </Grid>
        </Grid>
      </div>

      {!isEnded && (
        <div className="card p-24">
          <Grid flow="row" className={s.item}>
            <Grid flow="col" align="center" justify="space-between">
              <Hint
                text={
                  <Text type="p2">
                    This counter shows the time left in the current week. The pool(s) below are synchronized and have
                    epochs that last a week. You can deposit to the pool(s) during the duration of an epoch and receive
                    rewards proportional to the time they are staked, but the funds must stay staked until the clock
                    runs out and the epoch ends in order to be able to harvest the rewards.
                  </Text>
                }>
                <Text type="lb2" weight="semibold" color="primary" className={s.label}>
                  Time Left
                </Text>
              </Hint>
            </Grid>
            <Grid flow="row" gap={4}>
              {epochEndDate ? (
                <UseLeftTime end={epochEndDate} delay={1_000}>
                  {leftTime => (
                    <Text type="h2" weight="bold" color="primary" className="mb-4">
                      {leftTime > 0 ? getFormattedDuration(0, epochEndDate) : '0s'}
                    </Text>
                  )}
                </UseLeftTime>
              ) : (
                '-'
              )}
              <Text type="p1" color="secondary">
                until next epoch
              </Text>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default PoolStats;
